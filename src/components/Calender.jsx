import React from 'react';

function Calendar() {
  // 날짜 조회하기
  let d = new Date();
  let year = d.getFullYear();  // 년도
  let month = d.getMonth();    // 월 
  let date = d.getDate();      // 일
  console.log(year, month, date);

  // 말일 구하기(다음달 기준으로 조회해서 일값=0 하면 이번달 말임)
  let lastDate = new Date(year,month + 1, 0).getDate();
//시작일: 달력에서 1일이 시작할 위치 (요일값 =0....6)
let start_date = new Date(year,month, 1).getDay()
console.log(lastDate,start_date,);

  return (
    <div className='calendar'>
      <header>
        <h2>{year}</h2>
        <span>{month + 1}월</span>
      </header>
      <main>
        달력...
      </main>
    </div>
  );
}

export default Calendar;
