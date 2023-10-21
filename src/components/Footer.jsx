import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='h-[100%px] bg-[rgb(34,34,34)] mt-[30px]'>
      <div className='h-[40px] bg-[rgb(145,63,226)] items-center flex flex-row justify-center flex-wrap gap-10 text-white'>
        <Link to='https://github.com/C1earVision'><i class="fa-brands fa-github fa-2x"></i></Link>
        <h1>Design By C1earVision &copy; </h1>
      </div>
      <div className='flex justify-center p-4 h-[100%] text-white'>
        <i className="fa-solid self-center fa-book-open-reader fa-3x"></i>
      </div>
    </footer>
  )
}

export default Footer