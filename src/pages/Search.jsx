import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Search = ({searchData, setSearchData, setBookId, bookId}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const navigate = useNavigate()
  const wishList = async (bookId) => {
    if (!localStorage.getItem("token")) {
      alert("Please Log In");
      return;
    }
    setBookId(bookId);
    setIsSpinning(true);
    await axios
      .request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        url: `https://book-store-u2sc.onrender.com/api/v1/user/wishlist/${bookId}`,
      })
      .then((res) => console.log(res))
      .catch((err) => alert(err.response.data.msg));
  };

  const timeOut = () => {
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };


  return (
    <>
    <div className="flex flex-row font-roboto">
      <div className="w-[100%] ml-auto mt-[5%]">
          <h1 className="text-[rgb(82,82,91)] p-3 text-xl">Book List</h1>
          <hr />
          <div className="grid py-5 lg:grid-cols-6 md:grid-cols-4 xsm:grid-cols-3 grid-cols-1 m-auto place-items-center">
            {searchData ? (
              searchData.map((book) => {
                const { name, _id, price, author, genre, img } = book;
                return (
                  <div key={_id} className="flex transition-transform ease-in hover:scale-[1.04] flex-col shadow-lg m-2 relative bg-white rounded-lg text-center">
                    <Link
                      onClick={() => {
                        setBookId(_id);
                      }}
                      to={`books/${_id}`}
                    >
                      <div>
                        <img className="w-[250px] rounded-t-lg h-[350px]" src={img} alt="" />
                      </div>
                      <div className="flex flex-col mt-2 gap-2 text-[rgb(82,82,91)]">
                        <h1 className="font-bold">{name}</h1>
                        <h4>{author}</h4>
                      </div>
                    </Link>
                    <div className="flex flex-row justify-center mb-5 text-white">
                      <button
                        onClick={() => wishList(_id)}
                        className="bg-[rgb(49,71,106)] shadow-lg rounded-md hover:bg-[rgb(30,46,73)] active:bg-[rgb(19,33,55)] mt-3 py-1 px-3"
                      >
                        Wish List Book
                      </button>
                      {_id === bookId && isSpinning && (
                        <div className="mt-4 ml-3">
                          <i className="fa-solid fa-circle-notch fa-spin text-black"></i>
                          {timeOut()}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <i className="fa-solid fa-spinner fa-spin fa-3x"></i>
            )}
          </div>
        </div>
    </div>
      
    </>
  )
}

export default Search