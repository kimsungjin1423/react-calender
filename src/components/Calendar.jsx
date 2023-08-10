import React, { useState, useEffect } from "react";

function Calendar(props) {
  // props에서 년-월-일 가져오기

  let { year, month, date } = props;

  // 말일 구하기(다음달 기준으로 조회해서 일값=0 하면 이번달 말임)
  let lastDate = new Date(year, month + 1, 0).getDate();
  // 시작일: 달력에서 1일이 시작할 위치 (요일값 =0....6)
  let start_date = new Date(year, month, 1).getDay();

  const [selectedDate, setSelectedDate] = useState(date);
  const [events, setEvents] = useState([]);

  const handleDateClick = (day) => {
    setSelectedDate(day);
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
        setEvents([...events, { year, month, day, event: newEvent }]);
      }
    }
  };
  useEffect(() => {
    // 선택한 날짜의 연도와 월이 변경될 때마다 해당 연도와 월에 해당하는 일정만 남도록 업데이트
    const updatedEvents = events.map((event) => {
      if (event.year === year && event.month === month) {
        return event;
      }
      return {
        ...event,
        year: month > event.month ? year + 1 : year,
        month: (month + 1) % 12,
      };
    });

    setEvents(updatedEvents);
  }, [year]);

  useEffect(() => {
    // 일정이 변경될 때마다 일정 데이터를 로컬 스토리지에 저장합니다.
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    // 다음 달로 넘어가면 빨간색 스타일이 없어지도록 선택한 날짜 초기화
    setSelectedDate(null);
  }, [month]);

  return (
    <div className="calendar">
      <header>
        <span className="Month">{month + 1}월</span>
      </header>

      <main>
        <div className="daysArray">
          <div className="days">Sun</div>
          <div className="days">Mon</div>
          <div className="days">Tue</div>
          <div className="days">Wed</div>
          <div className="days">Thu</div>
          <div className="days">Fri</div>
          <div className="days">Sat</div>
        </div>
        <ul className="date">
          {Array(start_date)
            .fill()
            .map((_, i) => {
              return <li key={`empty-${i}`}></li>;
            })}
          {Array(lastDate)
            .fill()
            .map((_, i) => {
              const day = i + 1;

              return (
                <li
                  key={`day-${day}`}
                  onClick={() => handleDateClick(day)}
                  style={{
                    color: selectedDate === day ? "red" : "black",
                    fontSize: selectedDate === day ? "11px" : "11px",
                    position: "relative", // 상대 위치 지정
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start", // 왼쪽 정렬
                    justifyContent: "flex-start", // 상단 정렬
                  }}
                >
                  {day}
                </li>
              );
            })}
        </ul>
      </main>

      <div className="container1">
        <h3>─── 일정 목록 ─── </h3>
        {/* 일정 목록과 삭제 버튼 */}
        <div className="events-list">
          {events.map((event) => (
            <div key={`${event.year}-${event.month}-${event.day}`}>
              <span>
                ➢ㅤ{event.month + 1}월 {event.day}일:{" "}
              </span>
              <span>{event.event}</span>

              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation(); // 이벤트 버블링 방지
                  setEvents((prevEvents) =>
                    prevEvents.filter((e) => e.day !== event.day)
                  );
                }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>

        <button
          className="schedule"
          onClick={() => handleDateClick(selectedDate)}
        >
          + 일정 추가
        </button>
      </div>
    </div>
  );
}
export default Calendar;
