import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Calendar from './components/Calendar' // 오타 수정

function App() {
  // 년,월,일 생성 및 state
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [date, setDate] = useState(new Date().getDate());

  console.log(year, month, date);


  //다음 달
  const nextMonth = () => {
    if(month == 11){
      setMonth(0);//1월
      setYear(year + 1) //다음 년도
      return;
    }
    setMonth(month + 1);
  
  }
  console.log('month',month)

  //이전 달
  const prevMonth = () => {
    if(month == 0){
      setMonth(11);
      setYear(year -1);//이전 년도 
      return;
    }
    setMonth(month - 1);
   
  }

  return (
    <div className='App'>
      <Header />
      {/* 년-월-일 state를 Calendar 컴포넌트에 전달 */}
      <Calendar year={year} month={month} date={date} /> {/* 컴포넌트 이름 수정 */}
      <div className='btn-group'>
        <button className='prev' onClick={prevMonth}>이전달</button>
        <button className='next'onClick={nextMonth}>다음달</button>

      </div>
    </div>
  )
}

export default App
