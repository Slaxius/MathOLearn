import { useState, useEffect } from "react";
import "../css/comp/calendar.css";
import StreakOff from "../assets/icon/streak_off.svg";
import StreakOn from "../assets/icon/streak_on.svg";

function calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [streakDays, setStreakDays] = useState(1);

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay();
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const isToday = (day, month, year) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const generateCalendar = () => {
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const prevMonthDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    let calendar = [];
    let day = 1;
    let prevMonthDay = prevMonthDays - firstDay + 1;

    for (let i = 0; i < 5; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push({ day: prevMonthDay, isCurrentMonth: false });
          prevMonthDay++;
        } else if (day <= daysInMonth) {
          week.push({
            day,
            isCurrentMonth: true,
            isToday: isToday(day, currentMonth, currentYear),
          });
          day++;
        } else {
          week.push({ day: day - daysInMonth, isCurrentMonth: false });
          day++;
        }
      }
      calendar.push(week);
    }
    return calendar;
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const renderCalendar = () => {
    const calendar = generateCalendar();
    return calendar.map((week, weekIndex) => (
      <div key={weekIndex} className="calendar-week">
        {week.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className={`calendar-day boldBody2 ${
              day.isCurrentMonth
                ? day.isToday
                  ? "current-month today"
                  : "current-month"
                : "other-month"
            }`}
          >
            {day.day}
          </div>
        ))}
      </div>
    ));
  };

  const checkStreak = () => {
    const today = new Date();
    const storedDate = localStorage.getItem("lastUsedDate");
    const storedStreak = localStorage.getItem("streakDays");

    if (storedDate) {
      const storedDateObj = new Date(storedDate);
      const isSameDay =
        today.getDate() === storedDateObj.getDate() &&
        today.getMonth() === storedDateObj.getMonth() &&
        today.getFullYear() === storedDateObj.getFullYear();

      if (!isSameDay) {
        setStreakDays(1);
      } else {
        setStreakDays(parseInt(storedStreak) || 1);
      }
    }

    localStorage.setItem("lastUsedDate", today.toISOString());
    localStorage.setItem("streakDays", streakDays);
  };

  useEffect(() => {
    checkStreak();
  }, []);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="header-title">
          <h1 className="title header3">daily streak</h1>
        </div>
        <div className="streak-container">
          <img
            src={streakDays <= 2 ? StreakOff : StreakOn}
            alt="streak status"
          />
          <span className="streak-days header3">{streakDays}</span>
        </div>
        <div className="handle-month-year">
          <button onClick={handlePrevMonth} className="prev-next boldBody2">
            &lt;
          </button>
          <div className="month-year">
            <h1 className="header5">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h1>
          </div>
          <button onClick={handleNextMonth} className="prev-next boldBody2">
            &gt;
          </button>
        </div>
      </div>
      <div className="calendar-days">
        <div className="calendar-week">
          <div className="calendar-day boldBody2">Su</div>
          <div className="calendar-day boldBody2">Mo</div>
          <div className="calendar-day boldBody2">Tu</div>
          <div className="calendar-day boldBody2">We</div>
          <div className="calendar-day boldBody2">Th</div>
          <div className="calendar-day boldBody2">Fr</div>
          <div className="calendar-day boldBody2">Sa</div>
        </div>
        {renderCalendar()}
      </div>
    </div>
  );
}

export default calendar;
