import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const Book = ({ bookId }) => {
  const [bookData, setBookData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [genres, setGenres] = useState()
  const navigate = useNavigate();
  let url = window.location.href;
  url = url.split("/");
  url = url[url.length - 1];
  useEffect(() => {
    const getBookData = async () => {
      const data = await axios.get(
        `https://book-store-u2sc.onrender.com/api/v1/books/${bookId || url}`
      );
      setBookData(data.data.book);
      setGenres(data.data.book.genre.split(','))
    };
    getBookData();
  }, []);

  const wishList = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please Log In");
      return;
    }
    await axios
      .request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        url: `https://book-store-u2sc.onrender.com/api/v1/user/wishlist/${
          bookId || url
        }`,
      })
      .then(() => setSuccess(true))
      .catch((err) => alert(err.response.data.msg));
  };

  const modifyBook = () => {
    navigate("modify");
  };
  const deleteBook = async () => {
    await axios
      .request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "DELETE",
        url: `https://book-store-u2sc.onrender.com/api/v1/user/admin/${bookId}`,
      })
      .catch((err) => alert(err.response.data.msg));
    navigate("/");
  };

  const timeOut = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 10000);
  };

  return (
    <>
      <div className="bg-white w-[99%] font-roboto text-justify text-white mx-auto mt-[100px] p-5 rounded-md">
        <div className="flex md:flex-row flex-col">
          <div className="flex flex-col">
            <div className="w-[230px] h-[345px] self-center">
              <img src={bookData?.img} alt="" className="rounded-lg w-[100%] h-[100%]" />
            </div>
            <div className="font-bold text-3xl md:hidden block mx-auto my-2">
              <h1 className="text-[rgb(51,65,85)] ">{bookData?.name}</h1>
            </div>
            <div className="mt-3">
              <button
                onClick={() => wishList(bookId)}
                className="bg-[rgb(42,59,86)] shadow-lg w-[100%] rounded-md active:bg-[rgb(19,33,55)] hover:bg-[rgb(30,46,73)] mt-3 py-1 px-3"
              >
                Wish List Book
              </button>
              {success && (
                <div className="mt-4">
                  <Alert severity="success">Book added Successfully</Alert>
                  {timeOut()}
                </div>
              )}
            </div>
            {localStorage.getItem("admin") === "true" && 
            <>
              <div>
                <button
                  onClick={() => deleteBook(bookId)}
                  className="bg-[rgb(42,59,86)] shadow-lg w-[100%] rounded-md active:bg-[rgb(19,33,55)] hover:bg-[rgb(30,46,73)] mt-3 py-1 px-3"
                >
                  Delete Book
                </button>
              </div>
              <div>
                <button
                  onClick={() => modifyBook(bookId)}
                  className="bg-[rgb(42,59,86)] shadow-lg w-[100%] rounded-md active:bg-[rgb(19,33,55)] hover:bg-[rgb(30,46,73)] mt-3 py-1 px-3"
                >
                  Modify Book
                </button>
              </div>
            </>}

            <div>
              <button className="bg-[rgb(42,59,86)] shadow-lg w-[100%] rounded-md active:bg-[rgb(19,33,55)] hover:bg-[rgb(30,46,73)] mt-3 py-1 px-3">Buy Now</button>
            </div>
            <div className="text-[rgb(71,85,105)] items-center flex flex-row gap-5 mt-5">
              <p>Price:</p>
              <p className=" text-2xl align-">EGP {bookData?.price}.00</p>
            </div>
          </div>
          <div className="text-[rgb(51,65,85)] gap-10 md:ml-5 flex flex-col">
            <div className="font-bold text-3xl md:block hidden">
              <h1>{bookData?.name}</h1>
            </div>
            <div className="text-[rgb(51,65,85)] text-lg mt-5">
              <h1>Description</h1>
              <div className=" h-1 w-[90px] bg-[rgb(244,119,124)]">
              </div>
              <div className="mt-5"><h1>{bookData?.discreption}</h1></div>
            </div>
            <div className="text-[rgb(51,65,85)] text-lg mt-5">
              <h1>Genres</h1>
              <div className=" h-1 w-[60px] bg-[rgb(244,119,124)]">
              </div>
              <div className="flex flex-row flex-wrap gap-3 mt-5">
                {genres?.map((genre)=>{
                  return <button className="rounded-md px-2 py-1 bg-[rgb(42,59,86)] text-white">
                    {genre}
                  </button>
                })}
              </div>  
            </div>
            <div className="text-[rgb(51,65,85)] text-lg">
              <h1>Author</h1>
              <div className=" h-1 w-[55px] bg-[rgb(244,119,124)]">
              </div>
              <div className="mt-5 bg-[rgb(248,250,252)] p-3 gap-5 rounded-md flex flex-col">
                <div className="text-[rgb(30,48,80)] flex flex-row items-center gap-5">
                  <i className="fa-solid fa-circle-user fa-2x"></i>
                  <h1>{bookData?.author}</h1>
                </div>
                <div>
                  <h1>{bookData?.authorDetails}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
