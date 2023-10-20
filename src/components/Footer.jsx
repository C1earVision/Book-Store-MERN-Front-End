import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='h-[120px] bg-[rgb(34,34,34)] mt-[30px]'>
      <div className='h-[40px] bg-[rgb(145,63,226)] items-center flex flex-row justify-center gap-10 text-white'>
        <h1>Privacy Policy</h1>
        <h1>Terms Of Service</h1>
        <Link to='https://github.com/C1earVision'><i class="fa-brands fa-github fa-2x"></i></Link>
        <h1>Design By C1earVision &copy; </h1>
      </div>
    </footer>
  )
}

export default Footer