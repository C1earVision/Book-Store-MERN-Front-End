import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='h-[100px] bg-white mt-[30px]'>
      <div className='h-[140px] bg-[rgb(49,71,106)] items-center flex flex-row justify-center flex-wrap gap-10 text-white'>
        <Link to='https://github.com/C1earVision'><i className="fa-brands fa-github fa-2x"></i></Link>
        <h1>Design By C1earVision &copy; </h1>
      </div>
    </footer>
  )
}

export default Footer