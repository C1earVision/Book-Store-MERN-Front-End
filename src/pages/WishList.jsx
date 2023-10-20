import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const WishList = ({ setBookId, bookId }) => {
  const navigate = useNavigate();
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

  const removeBook = async (bookId) => {
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
    setBookId(bookId);
    setData(data.data.books);
  };

  return (
    <>
      <div className="lg:w-[70%] md:w-[90%] sm:w-[90%] w-[100%] m-auto bg-[rgb(34,34,34)] mt-[5%]">
        <h1 className="text-white p-3  text-xl">Book List</h1>
        <hr />
        <div className="grid py-5 md:grid-cols-3 grid-cols-1 m-auto place-items-center gap-5">
          {data.length === 0 ? (
            <div className="text-white text-2xl">No Books to show</div>
          ) : data ? (
            data.map((book) => {
              if (book === null) {
                return <div>No Books</div>;
              }
              const { name, _id, price, author, genre, img } = book;
              return (
                <div key={_id} className="flex flex-col m-2">
                  <Link
                    onClick={() => {
                      setBookId(_id);
                    }}
                    to={`books/${_id}`}
                  >
                    <div>
                      <img className="w-[300px] h-[400px]" src={img} alt="" />
                    </div>
                    <div className="flex flex-col text-white">
                      <h1 className="font-bold">{name}</h1>
                      <h4>{genre}</h4>
                    </div>
                  </Link>
                  <div className="text-white flex flex-row">
                    <button
                      onClick={() => removeBook(_id)}
                      className="bg-[rgb(145,63,226)] mt-3 p-2"
                    >
                      Remove Book
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <i className="fa-solid fa-spinner fa-spin fa-3x"></i>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishList;
