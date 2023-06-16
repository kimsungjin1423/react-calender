import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Calender from './components/Calender'


function App() {
  const [count, setCount] = useState(0)

  return (
   
    <div className='App'>
      <Header />
      <Calender />

    </div>
  )
}

export default App
