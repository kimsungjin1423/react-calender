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

  return (
    <div className='App'>
      <Header />
      {/* 년-월-일 state를 Calendar 컴포넌트에 전달 */}
      <Calendar year={year} month={month} date={date} /> {/* 컴포넌트 이름 수정 */}
    </div>
  )
}

export default App
