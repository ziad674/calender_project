const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const meetingTitle = document.getElementById("meetingTitle");
const meetingTime = document.getElementById("meetingTime");
const saveMeetingBtn = document.getElementById("saveMeeting");
const cancelMeetingBtn = document.getElementById("cancelMeeting");

let currentDate = new Date();
let meetings = {}; // { "YYYY-MM-DD": { title, time } }
let selectedDate = null;

// Render calendar
function renderCalendar() {
    calendar.innerHTML = "";
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

    // Day headers
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayNames.forEach(day => {
        const div = document.createElement("div");
        div.textContent = day;
        div.classList.add("day-header");
        calendar.appendChild(div);
    });

    // First day of the month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Blank days before first day
    for (let i = 0; i < firstDay; i++) {
        const blank = document.createElement("div");
        calendar.appendChild(blank);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const div = document.createElement("div");
        div.textContent = day;

        if (meetings[date]) {
            div.classList.add("meeting");
        }

        div.addEventListener("click", () => openPopup(date));
        calendar.appendChild(div);
    }
}

function openPopup(date) {
    selectedDate = date;
    if (meetings[date]) {
        popupTitle.textContent = "Edit Meeting";
        meetingTitle.value = meetings[date].title;
        meetingTime.value = meetings[date].time;
    } else {
        popupTitle.textContent = "Add Meeting";
        meetingTitle.value = "";
        meetingTime.value = "";
    }
    popup.classList.remove("hidden");
}

function closePopup() {
    popup.classList.add("hidden");
}

saveMeetingBtn.addEventListener("click", () => {
    const title = meetingTitle.value.trim();
    const time = meetingTime.value;

    if (!title || !time) {
        alert("Please fill out both title and time.");
        return;
    }

    meetings[selectedDate] = { title, time };
    closePopup();
    renderCalendar();
});

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
