import React, { useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom'
const ShowFooter = ({children}) => {
  const location = useLocation()
  const [ShowFooter, setShowFooter] = useState(false)
  useEffect(()=>{
    if(location.pathname === '/login' || location.pathname === '/register'){
      setShowFooter(false)
    }else{
      setShowFooter(true)
    }

  }, [location])
  return (
    <div>{ShowFooter && children}</div>
  )
}

export default ShowFooter