import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="lg:w-[70%] h-[500px] justify-center flex md:w-[90%] text-white sm:w-[90%] w-[100%] m-auto bg-[rgb(49,71,106)] rounded-lg mt-[2%]">
      <div className='w-[90%] self-center'>
        <p>This website is made by me i.e. <strong><Link to="https://github.com/C1earVision">C1earVision&copy;</Link></strong> and its design was inspired by <strong><Link to='https://www.aseeralkotb.com/en'>https://www.aseeralkotb.com/en</Link></strong></p>
      </div>
    </div>
  )
}

export default About