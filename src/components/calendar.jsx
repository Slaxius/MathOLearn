import { useState, useEffect } from "react";
import "../css/components/calendar.css";

function Calendar({ userId }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [streakDays, setStreakDays] = useState(0);
  const [allActiveDays, setAllActiveDays] = useState(() => {
    if (!userId) return new Set();
    try {
      const stored = localStorage.getItem(`allActiveDays_${userId}`);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch (error) {
      console.error("Failed to parse allActiveDays from localStorage", error);
      return new Set();
    }
  });

  const getCleanDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const getDateKey = (date) => {
    const d = getCleanDate(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

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
    const today = getCleanDate(new Date());
    const dateToCheck = getCleanDate(new Date(year, month, day));
    return today.getTime() === dateToCheck.getTime();
  };

  const isDayActive = (day, month, year) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return allActiveDays.has(dateKey);
  };

  const generateCalendar = () => {
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const prevMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    const prevMonthDays = prevMonthDate.getDate();

    let calendar = [];
    let day = 1;
    let prevMonthDay = prevMonthDays - firstDay + 1;

    for (let i = 0; i < 6; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        let dateObj = null;
        let displayDay = null;
        let isCurrentMonthFlag = false;

        if (i === 0 && j < firstDay) {
          displayDay = prevMonthDay;
          dateObj = new Date(currentYear, currentMonth - 1, displayDay);
          prevMonthDay++;
        } else if (day <= daysInMonth) {
          displayDay = day;
          dateObj = new Date(currentYear, currentMonth, displayDay);
          isCurrentMonthFlag = true;
          day++;
        } else {
          displayDay = day - daysInMonth;
          dateObj = new Date(currentYear, currentMonth + 1, displayDay);
          day++;
        }

        week.push({
          day: displayDay,
          isCurrentMonth: isCurrentMonthFlag,
          isToday: isToday(
            displayDay,
            dateObj.getMonth(),
            dateObj.getFullYear()
          ),
          isActive: isDayActive(
            displayDay,
            dateObj.getMonth(),
            dateObj.getFullYear()
          ),
        });
      }
      calendar.push(week);
      if (day > daysInMonth && i > 0 && week.some((d) => d.isCurrentMonth))
        break;
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
        {week.map((day, dayIndex) => {
          let className = `calendar-day boldBody2`;

          if (day.isCurrentMonth) {
            className += " current-month";
            if (day.isToday) {
              className += " today";
            }
            if (day.isActive) {
              className += " active-day";
            }
          } else {
            className += " other-month";
          }

          return (
            <div key={dayIndex} className={className}>
              {day.day}
            </div>
          );
        })}
      </div>
    ));
  };

  const checkAndSetStreak = () => {
    if (!userId) {
      console.warn("User ID is not available, skipping streak update.");
      return;
    }

    const today = getCleanDate(new Date());
    const todayKey = getDateKey(today);

    setAllActiveDays((prevActiveDays) => {
      const newActiveDays = new Set(prevActiveDays);
      if (!newActiveDays.has(todayKey)) {
        newActiveDays.add(todayKey);
        localStorage.setItem(
          `allActiveDays_${userId}`,
          JSON.stringify(Array.from(newActiveDays))
        );
      }
      return newActiveDays;
    });

    let currentCalculatedStreak = 0;
    let tempDate = new Date(today);
    let foundStreak = true;

    const latestAllActiveDays = new Set(
      JSON.parse(localStorage.getItem(`allActiveDays_${userId}`) || "[]")
    );

    while (foundStreak) {
      const checkDateKey = getDateKey(tempDate);
      if (latestAllActiveDays.has(checkDateKey)) {
        currentCalculatedStreak++;
        tempDate.setDate(tempDate.getDate() - 1);
      } else {
        foundStreak = false;
      }
    }

    if (currentCalculatedStreak === 0 && latestAllActiveDays.size > 0) {
      currentCalculatedStreak = 1;
    } else if (latestAllActiveDays.size === 0) {
      currentCalculatedStreak = 0;
    }

    setStreakDays(currentCalculatedStreak);

    localStorage.setItem(`lastActiveDate_${userId}`, today.toISOString());
    localStorage.setItem(
      `streakLength_${userId}`,
      currentCalculatedStreak.toString()
    );
  };

  useEffect(() => {
    if (userId) {
      checkAndSetStreak();

      const storedLastLogin = localStorage.getItem(`lastLogin_${userId}`);
      if (storedLastLogin) {
        const parsedDate = new Date(storedLastLogin);
        console.log(
          `User ${userId} last logged in: ${parsedDate.toLocaleString()}`
        );
      } else {
        console.log(`User ${userId} has no recorded last login.`);
      }
    }
  }, [userId]);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="header-title">
          <h1 className="title header3">daily streak</h1>
        </div>
        <div className="streak-container">
          <img
            src={
              streakDays < 2
                ? "/assets/icon/streak_off.svg"
                : "/assets/icon/streak_on.svg"
            }
            alt="streak status"
          />
          <span className="streak-days header3">{streakDays}</span>
        </div>
        <div className="handle-month-year">
          <button
            onClick={handlePrevMonth}
            className="previous-month boldBody2"
          >
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
          <button onClick={handleNextMonth} className="next-month boldBody2">
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
