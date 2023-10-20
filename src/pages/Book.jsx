import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'


const Book = ({bookId}) => {
  const [bookData, setBookData] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  let url = window.location.href;
  url = url.split('/')
  url = url[url.length - 1]
  useEffect(()=>{
    const getBookData = async()=>{
      const data = await axios.get(`http://localhost:3000/api/v1/books/${bookId || url}`)
      setBookData(data.data.book)
    }
    getBookData()
  },[])
  
  const wishList = async ()=>{
    if(!localStorage.getItem('token')){
      alert('Please Log In')
      return
    }

    await axios.request({headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
      method: "POST",
      url: `http://localhost:3000/api/v1/user/wishlist/${bookId || url}`
    }).then(()=>setSuccess(true)).catch((err)=>alert(err.response.data.msg))
    
  }

  const modifyBook = ()=>{
    navigate('modify')
  }
  const deleteBook = async ()=>{
    await axios.request({headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
      method: "DELETE",
      url: `http://localhost:3000/api/v1/user/admin/${bookId}`
    }).catch((err)=>alert(err.response.data.msg))
    navigate('/')
  }

  return (
    <>
      <div className='flex flex-row flex-wrap lg:justify-start justify-center text-white mx-auto w-[70%] bg-[rgb(34,34,34)] mt-[5%]'>
        <div className='p-3'>
          <img className='w-[300px] h-[370px]' src={bookData?.img} alt="" />
        </div>
        <div className='flex flex-col p-3 self-center'>
          <div className='flex flex-col'>
            <h1 className=' font-bold sm:text-3xl text-2xl'>{bookData?.name}</h1>
            <div className='flex flex-row items-center mt-4 gap-3'>
              <div className='bg-[rgb(145,63,226)] py-2 px-3 rounded-sm'>
                <p>Author</p>
              </div>
              <p>{bookData?.author}</p>
            </div>
            <div className='flex flex-row items-center mt-4 gap-3'>
              <div className='bg-[rgb(145,63,226)] py-2 px-3 rounded-sm'>
                <p>Genres</p>
              </div>
              <p>{bookData?.genre}</p>
            </div>
            <div className='flex flex-row items-center mt-4 gap-3'>
              <div className='bg-[rgb(145,63,226)] w-[73px] text-center py-2 px-3 rounded-sm'>
                <p>Price</p>
              </div>
              <p>{bookData?.price} $</p>
            </div>
            <div className='flex flex-row items-center mt-4 gap-3'>
            {localStorage.getItem('admin') === 'true' ?
              <>
                <button onClick={wishList} className='bg-[rgb(59,89,153)] active:bg-[rgb(38,55,92)] hover:bg-[rgb(51,69,104)] py-2 px-3 rounded-sm'>
                  <p>Wish List</p>
                </button>
                <div className='flex flex-row gap-3'>
                  <button onClick={deleteBook} className='bg-[rgb(59,89,153)] active:bg-[rgb(38,55,92)] hover:bg-[rgb(51,69,104)] py-2 px-3 rounded-sm'>Delete Book</button>
                  <button onClick={modifyBook} className='bg-[rgb(59,89,153)] active:bg-[rgb(38,55,92)] hover:bg-[rgb(51,69,104)] py-2 px-3 rounded-sm'>Modify Book</button>
                </div>
              </>
              :
                <button onClick={wishList} className='bg-[rgb(59,89,153)] active:bg-[rgb(38,55,92)] hover:bg-[rgb(51,69,104)] w-[100%] py-2 px-3 rounded-sm'>
                  <p>Wish List</p>
                </button>
              }
            </div>
            <div className='flex flex-row items-center mt-4 gap-3'>
              <button className='bg-[rgb(59,89,153)] active:bg-[rgb(38,55,92)] hover:bg-[rgb(51,69,104)] py-2 px-3 w-[100%] rounded-sm'>
                <p>Buy Now</p>
              </button>
            </div>
            <div className='mt-2'>
              {success && <Alert severity="success">Book Successfully Added to Wish List</Alert>}
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Book