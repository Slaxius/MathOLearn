import { useState, useEffect } from "react";
import "../css/components/calendar.css";

function Calendar({ lastLoginDateFromUser }) {
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

  const calculateDaysDifference = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const checkAndSetStreak = () => {
    const today = new Date();
    const storedLastUsedDate = localStorage.getItem("lastUsedDate");
    const storedStreak = parseInt(localStorage.getItem("streakDays")) || 0;

    let calculatedStreak = 1;

    if (lastLoginDateFromUser) {
      const userLastLoginDate = new Date(lastLoginDateFromUser);
      const daysSinceUserLogin = calculateDaysDifference(
        userLastLoginDate,
        today
      );

      if (daysSinceUserLogin === 0) {
        calculatedStreak = 1;
      } else if (daysSinceUserLogin === 1) {
        calculatedStreak = 2;
      } else {
        calculatedStreak = 1;
      }
    }

    if (storedLastUsedDate) {
      const storedDateObj = new Date(storedLastUsedDate);
      const daysSinceLastComponentUse = calculateDaysDifference(
        storedDateObj,
        today
      );

      if (daysSinceLastComponentUse === 0) {
        calculatedStreak = storedStreak;
      } else if (daysSinceLastComponentUse === 1) {
        calculatedStreak = storedStreak + 1;
      } else {
        calculatedStreak = 1;
      }
    }

    if (calculatedStreak < 1) {
      calculatedStreak = 1;
    }

    setStreakDays(calculatedStreak);
    localStorage.setItem("lastUsedDate", today.toISOString());
    localStorage.setItem("streakDays", calculatedStreak.toString());
  };

  useEffect(() => {
    checkAndSetStreak();
  }, [lastLoginDateFromUser]);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="header-title">
          <h1 className="title header3">daily streak</h1>
        </div>
        <div className="streak-container">
          <img
            src={
              streakDays < 3
                ? "/assets/icon/streak_off.svg"
                : "/assets/icon/streak_on.svg"
            }
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

export default Calendar;
