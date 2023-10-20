import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Search = ({searchData, setSearchData, setBookId}) => {

  return (
    <>
      <div className='w-[70%] m-auto bg-[rgb(34,34,34)] mt-[5%]'>
        <div className='grid py-5 md:grid-cols-3 xsm:grid-cols-2 grid-cols-1 m-auto place-items-center gap-5'>
          {searchData.map((book)=>{
            const {name, _id, price, author, genre, img} = book
            return (
              <div key={_id} className='flex flex-col m-2'>
                <Link onClick={()=>{setBookId(_id)}} to={`${_id}`}>
                  <div>
                    <img className='w-[300px] h-[400px]' src={img} alt="" />
                  </div>
                  <div className='flex flex-col text-white'>
                    <h1>{name}</h1>
                    <h4>{genre}</h4>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Search