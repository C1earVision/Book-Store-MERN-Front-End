import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'




const breakPoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
}

const NavLinks = () => {
  const navigate = useNavigate()
  const wishListClick = ()=>{
    if(localStorage.getItem('token')){
      navigate('/wishlist')
      return
    }
    alert('Please Log In')
  }
  return(
    <div className='bg-[rgb(145,63,226)] leading-[3rem]'>
      <div className='w-[60%] ml-[10%]'>
        <ul className='flex flex-row flex-nowrap space-x-[2rem] text-white'>
          <li className='hover:bg-[rgb(98,43,153)] w-[5rem] text-center'>
            <Link to='/'>Home</Link>
          </li>
          <li className='hover:bg-[rgb(98,43,153)] lg:w-[8rem] text-center'>
            <button onClick={wishListClick}>Wish List</button>
          </li>
          <li className='hover:bg-[rgb(98,43,153)] w-[5rem] text-center'>
            <Link to='/about'>About</Link>
          </li>
          <li className='hover:bg-[rgb(98,43,153)] lg:w-[8rem]  text-center'>
            <Link to='/mostpopular'>Most Popular</Link>
          </li>
          {localStorage.getItem('admin') === 'true' && 
          <li className='hover:bg-[rgb(98,43,153)] lg:w-[8rem]  text-center'>
            <Link to='/adminpage'>Add Book</Link>
          </li>}
        </ul>
      </div>
    </div>
  )
}

const SideBar = ({userName})=>{
  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate()
  const handleClick = ()=>setClicked(!clicked)
  
  const logOut = ()=>{
    navigate('/')
    localStorage.clear()
  }
  const wishListClick = ()=>{
    if(localStorage.getItem('token')){
      navigate('/wishlist')
      return
    }
    alert('Please Log In')
  }
  return (
    <>
        <div className='text-white w-[100%]'>
          <button onClick={handleClick}>
            <i className="fa-sharp fa-solid fa-bars fa-2x"></i>
          </button>
          {clicked? 
          <>
            <div className='bg-[rgb(31,23,39)] z-10 bg-opacity-90 leading-[3rem] absolute top-[3.2rem] right-3 w-[100%]'>
              <div>
                <ul className='flex flex-col p-3 text-white'>
                  <Link className='m-2' to='/'>
                    <li className='hover:bg-[rgb(98,43,153)] px-2 rounded-sm'>
                        Home
                    </li>
                  </Link>
                  <li className='hover:bg-[rgb(98,43,153)] ml-2 px-2 rounded-sm'>
                    <button onClick={wishListClick}>Wish List</button>
                  </li>
                  <Link className='m-2' to='/about'>
                    <li className='hover:bg-[rgb(98,43,153)] px-2 rounded-sm'>
                        about
                    </li>
                  </Link>
                  <Link className='m-2' to='/mostpopular'>
                    <li className='hover:bg-[rgb(98,43,153)] px-2 rounded-sm'>
                        Most Popular
                    </li>
                  </Link>
                  <hr className='mt-5 mb-5' />
                  {localStorage.getItem('token')? 
                  <div className='flex flex-row gap-10'>
                    <div className='text-white flex flex-col'>
                      <div className='w-[10%] h-7'>
                        <i class="fa-regular fa-circle-user fa-2x ml-5"></i>
                      </div>
                      <h1>Hello {userName?.split(' ')[0]}</h1>
                    </div>
                    <div className='text-white h-[50%]'>
                      <button onClick={logOut} className='bg-[rgb(145,63,226)] hover:bg-[rgb(89,40,137)] py-1 px-3 rounded-md active:bg-[rgb(64,34,95)]'>Log Out</button>
                    </div>
                  </div>
                    : 
                  <ul className='flex flex-col text-white'>
                    <Link className='m-2' to='/login'>
                      <li className='hover:bg-[rgb(98,43,153)] px-2 rounded-sm'>
                          Login
                      </li>
                    </Link>    
                    <Link className='m-2' to='/register'>
                      <li className='hover:bg-[rgb(98,43,153)] px-2 rounded-sm'>
                          Register
                      </li>
                    </Link>  
                  </ul>}
                </ul>
              </div>
          </div>
        </>
        :null
        }
      </div>
    </>
  )
}

const NavBar = ({searchData, setSearchData, userName}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const {sm, md, lg, xl, xxl} = breakPoints
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleChange = (e)=>{
    setSearch(e.target.value)
  }
  const handleSearch = async (e)=>{
    e.preventDefault()
    const searchData = await axios.get(`http://localhost:3000/api/v1/books?name=${search}`)
    setSearchData(searchData.data.books)
    console.log(searchData)
    navigate(`/search?name=${search}`)
  }
  const logOut = ()=>{
    navigate('/')
    localStorage.clear()
  }

  return (
    <>
      <nav className='bg-black relative'>
        <div className='flex flex-row h-[70px] items-center'>
          <div className='md:ml-[10%] ml-[5rem] text-gray-300 sm:block hidden'>
            <Link to='/'>
              <i className="fa-solid fa-book-open-reader fa-3x"></i>
            </Link>
          </div>
          <div className='md:w-[25%] w-[50%] lg:ml-[35%] relative z-10 sm:ml-[20%] ml-[8rem]'>
            <form className='text-white relative'>
              <div className=''>
                <input value={search} onChange={handleChange} className='w-[100%] h-[40px] px-4 rounded-sm outline-none bg-[rgb(26,24,31)] text-white' type="text" placeholder="  Search..." />
                <button className='absolute right-3 top-2' onClick={handleSearch}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </form>
          </div>
          {localStorage.getItem('token')? 
            <>
              <div className='ml-[10%] md:flex md:flex-row hidden gap-5'>
                <div className='text-white flex flex-col'>
                  <i className="fa-regular fa-circle-user fa-2x self-center"></i>
                  <h1>Hello {userName?.split(' ')[0]}</h1>
                </div>
                <div className='text-white h-[50%] self-center'>
                  <button onClick={logOut} className='bg-[rgb(145,63,226)] hover:bg-[rgb(89,40,137)] py-2 px-3 rounded-md active:bg-[rgb(64,34,95)]'>Log Out</button>
                </div>
              </div>
            </>
               : 
            <div className='ml-[10%] md:flex md:flex-row hidden'>
              <div className='text-white'>
                <Link to='/login' className='self-center flex flex-col'>
                  <i className="fa-sharp fa-regular fa-right-to-bracket self-center"></i>
                  <h4>Log In</h4>
                </Link>
              </div>
              <div className='text-white ml-[50px]'>
                <Link to='/register' className='self-center md:flex md:flex-col hidden'>
                  <i className="fa-regular fa-address-card self-center"></i>
                  <h4>Register</h4>
                </Link> 
              </div>
            </div>}
          
        </div>
      </nav>
      {width > md? <NavLinks />: <>
      <div className='absolute top-5 left-3 w-[100%]'>
        <SideBar userName={userName} />
      </div>
      </>}
      
    </>
  )
}

export default NavBar