import React from 'react'
import Header from './Header'
import CalenderGrid from './Grid'

const Calender:React.FC = () => {
  return (
    <div className='max-w-sm sm:max-w-6xl mx-auto my-10 shadow-lg'>
      <Header />
      <CalenderGrid />
    </div>
  )
}

export default Calender
