import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ setBookId, bookId }) => {
  const [data, setData] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `https://book-store-u2sc.onrender.com/api/v1/books`
      );
      setData(data.data.books);
    };
    getData();
  }, []);

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

  const modifyBook = (id) => {
    navigate(`/books/${id}/modify`);
  };
  return (
    <>
      <div className="lg:w-[70%] md:w-[90%] sm:w-[90%] w-[100%] m-auto bg-[rgb(34,34,34)] mt-[5%]">
        <h1 className="text-white p-3  text-xl">Book List</h1>
        <hr />
        <div className="grid py-5 md:grid-cols-3 xsm:grid-cols-2 grid-cols-1 m-auto place-items-center gap-5">
          {data ? (
            data.map((book) => {
              const { name, _id, price, author, genre, img } = book;
              return (
                <div key={_id} className="flex flex-col m-2 relative">
                  <Link
                    onClick={() => {
                      setBookId(_id);
                    }}
                    to={`books/${_id}`}
                  >
                    <div className="">
                      <img className="w-[300px] h-[400px]" src={img} alt="" />
                    </div>
                    <div className="flex flex-col text-white">
                      <h1 className="font-bold">{name}</h1>
                      <h4>{genre}</h4>
                    </div>
                  </Link>
                  <div className="flex flex-row text-white">
                    <button
                      onClick={() => wishList(_id)}
                      className="bg-[rgb(145,63,226)] active:bg-[rgb(63,33,94)] hover:bg-[rgb(102,53,151)] mt-3 p-2"
                    >
                      Wish List Book
                    </button>
                    {_id === bookId && isSpinning && (
                      <div className="mt-4 ml-3">
                        <i className="fa-solid fa-circle-notch fa-spin"></i>
                        {timeOut()}
                      </div>
                    )}
                    {localStorage.getItem("admin") === "true" && (
                      <div className="absolute right-0">
                        <button
                          onClick={() => modifyBook(_id)}
                          className="bg-[rgb(145,63,226)] active:bg-[rgb(63,33,94)] hover:bg-[rgb(102,53,151)] mt-3 p-2"
                        >
                          Modify Book
                        </button>
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
    </>
  );
};

export default Home;
