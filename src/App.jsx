import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header ";
import Calendar from "./components/Calendar";

function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [date, setDate] = useState(new Date().getDate());

  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    try {
      return storedEvents ? JSON.parse(storedEvents) : [];
    } catch (error) {
      console.error("Error parsing stored events:", error);
      return [];
    }
  });

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prevYear) => prevYear - 1);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleDateClick = (day) => {
    const event = events.find((e) => e.day === day);
    if (event) {
      const updatedEvent = prompt("일정을 수정하거나 삭제하세요:", event.event);
      if (updatedEvent === null) {
        // 프롬프트를 취소한 경우, 삭제합니다.
        setEvents((prevEvents) => prevEvents.filter((e) => e.day !== day));
      } else if (updatedEvent !== event.event) {
        // 프롬프트에서 수정한 경우, 일정을 업데이트합니다.
        setEvents((prevEvents) =>
          prevEvents.map((e) =>
            e.day === day ? { ...e, event: updatedEvent } : e
          )
        );
      }
    } else {
      const newEvent = prompt("일정을 입력하세요:");
      if (newEvent) {
        setEvents([...events, { day, event: newEvent, month, year }]);
      }
    }
  };

  useEffect(() => {
    // events 상태가 변경될 때마다 localStorage에 저장
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  return (
    <div className="App">
      <Header />
      <div className="title">
        <h1 className="Date-march">
          <span className="small-text">March</span> {year}
        </h1>
        <button className="prev" onClick={prevMonth}>
          left
        </button>
        <button className="next" onClick={nextMonth}>
          right
        </button>
      </div>
      <Calendar
        year={year}
        month={month}
        date={date}
        events={events}
        handleDateClick={handleDateClick}
      />
      <div className="btn-group"></div>
    </div>
  );
}

export default App;
