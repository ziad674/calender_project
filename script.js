const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

const popup = document.getElementById("popup");
const popupContent = document.querySelector(".popup-content");
const popupTitle = document.getElementById("popupTitle");
const meetingTitle = document.getElementById("meetingTitle");
const meetingTime = document.getElementById("meetingTime");
const saveMeetingBtn = document.getElementById("saveMeeting");
const cancelMeetingBtn = document.getElementById("cancelMeeting");
const meetingList = document.getElementById("meetingList");

let currentDate = new Date();
let meetings = JSON.parse(localStorage.getItem("meetings")) || {};
let selectedDate = null;

// Render calendar
function renderCalendar() {
  calendar.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  // Weekday headers (localized)
  const dayNames = [];
  for (let i = 0; i < 7; i++) {
    dayNames.push(
      new Intl.DateTimeFormat(navigator.language, { weekday: "short" }).format(
        new Date(2021, 7, i + 1)
      )
    );
  }
  dayNames.forEach((day) => {
    const div = document.createElement("div");
    div.textContent = day;
    div.classList.add("day-header");
    calendar.appendChild(div);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  // Blank days before first day
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    calendar.appendChild(blank);
  }

  // Days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const btn = document.createElement("button");
    btn.setAttribute("aria-label", `${date}`);
    btn.innerHTML = `<strong>${day}</strong>`;

    // Highlight today
    if (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    ) {
      btn.classList.add("today");
    }

    if (meetings[date] && meetings[date].length > 0) {
      btn.classList.add("has-meeting");
      meetings[date].forEach((m) => {
        const span = document.createElement("span");
        span.classList.add("meeting-title");
        span.textContent = `${m.time} ${m.title}`;
        span.title = `${m.time} ${m.title}`;
        btn.appendChild(span);
      });
      btn.setAttribute(
        "aria-label",
        `${date} – ${meetings[date].length} meetings`
      );
    }

    btn.addEventListener("click", () => openPopup(date));
    calendar.appendChild(btn);
  }
}

function openPopup(date) {
  selectedDate = date;
  popup.classList.remove("hidden");
  popupContent.focus();
  showMeetings(date);
}

function closePopup() {
  popup.classList.add("hidden");
  meetingTitle.value = "";
  meetingTime.value = "";
}

function showMeetings(date) {
  meetingList.innerHTML = "";
  if (meetings[date]) {
    meetings[date].forEach((m, i) => {
      const div = document.createElement("div");
      div.classList.add("meeting-item");
      div.innerHTML = `<span>${m.time} - ${m.title}</span>`;
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.addEventListener("click", () => deleteMeeting(date, i));
      div.appendChild(delBtn);
      meetingList.appendChild(div);
    });
  }
}

function saveMeeting() {
  const title = meetingTitle.value.trim();
  const time = meetingTime.value;
  if (!title || !time) {
    alert("Please fill out both title and time.");
    return;
  }

  if (!meetings[selectedDate]) meetings[selectedDate] = [];
  meetings[selectedDate].push({ title, time });
  localStorage.setItem("meetings", JSON.stringify(meetings));

  meetingTitle.value = "";
  meetingTime.value = "";
  showMeetings(selectedDate);
  renderCalendar();
}

function deleteMeeting(date, index) {
  meetings[date].splice(index, 1);
  if (meetings[date].length === 0) {
    delete meetings[date];
  }
  localStorage.setItem("meetings", JSON.stringify(meetings));
  showMeetings(date);
  renderCalendar();
}

// Popup closing via ESC / backdrop
popup.addEventListener("click", (e) => {
  if (e.target === popup) closePopup();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !popup.classList.contains("hidden")) {
    closePopup();
  }
});

// Event listeners
saveMeetingBtn.addEventListener("click", saveMeeting);
cancelMeetingBtn.addEventListener("click", closePopup);
prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});
nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initial render
renderCalendar();
