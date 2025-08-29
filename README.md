# 🗓️ Meeting Calendar

An interactive meeting calendar built with **HTML, CSS, and JavaScript**. This calendar allows you to schedule, view, edit, and delete meetings with full in-browser persistence (using `localStorage`).

---

## ✨ Features

- **Monthly Calendar View**
  - Navigate between months (previous/next).
  - Highlights today’s date for orientation.

- **Meeting Management**
  - Add **multiple meetings per day** (title + time).
  - Edit or delete meetings easily.
  - Meetings are **persisted with localStorage** (remain after page refresh).

- **User Interface**
  - Responsive layout with clean design.
  - Visual indicators for meeting days.
  - Tooltips for long meeting titles.

- **Accessibility**
  - Days use `<button>` elements with `aria-label` for screen readers.
  - Popup modal has `role="dialog"`, ESC/backdrop closing, and keyboard focus trap.
  - Proper color contrast for readability.

- **Localization**
  - Weekday headers adapt to the user’s locale.
  - First day of the week adjusts automatically.

---

## 🚀 Getting Started

### 1. Clone or Download
```bash
git clone https://github.com/yourusername/meeting-calendar.git
```
Or download as a `.zip` and extract.

### 2. Open the Project
- Locate `index.html` in the project folder.

### 3. Run the Project
- **Option A**: Double-click `index.html` → opens in default browser.
- **Option B**: Right-click → *Open with* → select browser.

✅ No installation required — works entirely in the browser.

---

## 🔧 Optional – Run with a Local Server

### Using VS Code Live Server
1. Open the project in **Visual Studio Code**.
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.

### Using Python 3
```bash
cd path/to/project
python -m http.server 8000
```
Then open: [http://localhost:8000](http://localhost:8000)

---

## 📂 Project Structure

```
meeting-calendar/
│── index.html   # Calendar structure & popup modal
│── style.css    # Layout, styling, and accessibility visuals
│── script.js    # Functionality (meetings, localStorage, accessibility)
│── README.md    # Documentation
```

---

## 📸 Screenshots (Optional)

- **Monthly View**: Calendar with meetings highlighted.
- **Popup Modal**: Add/Edit meeting details.
- **Meeting Indicators**: Dots or truncated text for long titles.

*(Add screenshots here for demonstration.)*

---

## 📌 Future Enhancements

- Add weekly/daily views for more detail.
- Drag-and-drop rescheduling.
- Export/Import meetings (JSON or ICS).
- Integration with Google/Outlook calendars.

---

## 🎉 Enjoy Scheduling!
Use this calendar to keep track of your meetings and stay organized!

