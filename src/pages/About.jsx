import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="lg:w-[70%] h-[500px] justify-center flex md:w-[90%] text-white sm:w-[90%] w-[100%] m-auto bg-[rgb(34,34,34)] mt-[2%]">
      <div className='w-[90%] self-center'>
        <p>This website is a college peoject made by me i.e. <strong><Link to="https://github.com/C1earVision">C1earVision&copy;</Link></strong> and its design was inspired by <strong><Link to='https://asuratoon.com/'>https://asuratoon.com/</Link></strong></p>
      </div>
    </div>
  )
}

export default About