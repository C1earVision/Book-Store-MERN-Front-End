import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";

const WishList = ({ setBookId, bookId }) => {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  let url = window.location.href;
  url = url.split("/");
  url = url[url.length - 1];
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "GET",
        url: `https://book-store-u2sc.onrender.com/api/v1/user/wishlist`,
      });
      setData(data.data.books);
    };
    getData();
  }, []);

  const timeOut = () => {
    setTimeout(() => {
      setIsSpinning(false);
    }, 2000);
  };

  const removeBook = async (bookId) => {
    setBookId(bookId);
    setIsSpinning(true);
    await axios.request({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      url: `https://book-store-u2sc.onrender.com/api/v1/user/wishlist/${bookId}`,
    });
    const data = await axios.request({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
      url: `https://book-store-u2sc.onrender.com/api/v1/user/wishlist`,
    });
    setData(data.data.books);
  };

  return (
<>
    <div className="flex flex-row font-roboto">
      <div className="w-[100%] ml-auto mt-[5%]">
        <h1 className="text-[rgb(82,82,91)] p-3 text-xl">Book List</h1>
          <hr />
          <div className="grid py-5 lg:grid-cols-6 md:grid-cols-4 xsm:grid-cols-3 grid-cols-1 m-auto place-items-center">
            {data.length>0 ? (
              data.map((book) => {
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
                        onClick={() => removeBook(_id)}
                        className="bg-[rgb(49,71,106)] shadow-lg rounded-md hover:bg-[rgb(30,46,73)] active:bg-[rgb(19,33,55)] mt-3 py-1 px-3"
                      >
                        Remove Book
                      </button>
                      {_id === bookId && isSpinning && (
                        <div className="mt-4 ml-3">
                          {console.log('true')}
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
  );
};

export default WishList;
