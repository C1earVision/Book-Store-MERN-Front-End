import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ setBookId, bookId }) => {
  const [data, setData] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2)
  const navigate = useNavigate();
  const [ischecked, setIsChecked] = useState({fantasy:false,adventure:false,fiction:false})
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

  const loadMore = ()=>{
    setIsLoading(true)
    const getData = async () => {
      const data = await axios.get(
        `https://book-store-u2sc.onrender.com/api/v1/books?page=${page}`
      );
      setData(data.data.books);
      setPage(page+1)
      setIsLoading(false)
    };
    getData();
     
  }

  const sortData = (e)=>{
    const getData = async () => {
      const data = await axios.get(
        `https://book-store-u2sc.onrender.com/api/v1/books?sort=${e.target.value}`
      );
      setData(data.data.books);
    };
    getData();
  }
  const setCategories = (category)=>{
    setIsChecked({...ischecked, [category]:!ischecked[category]})
  }
  const sortCategory = async ()=>{
    let categorys = []
    for(let i=0;i<Object.keys(ischecked).length;i++){
      if(ischecked[Object.keys(ischecked)[i]] === true){
        categorys.push(Object.keys(ischecked)[i])
      }
    }
    const categoryString = categorys.join(', ')
    console.log(categoryString)
    const data = await axios.get(
      `https://book-store-u2sc.onrender.com/api/v1/books?genre=${categoryString}`
    );
    setData(data.data.books);
  }
  return (
    <>
      <div className="flex flex-col font-roboto">
        <div className={`w-[100%] p-2 flex lg:flex-row flex-col ml-auto mt-[5%]`}>
            <hr />
            <div className="lg:w-[20%] w-full p-2 bg-white my-7 rounded-lg">
              <h1 className="text-black p-3 text-3xl font-bold">Filters</h1>
              <hr />
              <h1 className="text-black p-3 text-2xl font-bold">Sort By</h1>
              <div className="border-2 p-2">
                  <select onChange={sortData} name="sortMenue" className="w-full outline-none">
                    <option value="-createdAt">Newest</option>
                    <option value="createdAt">Oldest</option>
                    <option value="name">Name</option>
                    <option value="-price">price H-L</option>
                    <option value="price">price L-H</option>
                  </select>
              </div>
              <hr className="mt-5"/>
              <h1 className="text-black p-3 text-2xl font-bold">Categories</h1>
              <div className="flex flex-col px-3 gap-3">
                <div className="flex flex-row gap-3">
                  <input onChange={()=>setCategories('fantasy')} type="checkbox" />
                  <label>Fantasy</label>
                </div>
                <div className="flex flex-row gap-3">
                  <input onChange={()=>setCategories('adventure')} type="checkbox" n />
                  <label>Adventure</label>
                </div>
                <div className="flex flex-row gap-3">
                  <input onChange={()=>setCategories('fiction')} type="checkbox" />
                  <label>Fiction</label>
                </div>
                <div className="flex flex-row gap-3">
                  <input onChange={()=>setCategories('history')} type="checkbox" />
                  <label>History</label>
                </div>
                <div className="flex flex-row gap-3">
                  <input onChange={()=>setCategories('action')} type="checkbox" />
                  <label>Action</label>
                </div>
                <div className="flex flex-row gap-3">
                  <input onChange={()=>setCategories('romance')} type="checkbox" />
                  <label>Romance</label>
                </div>
                <div className="p-2 my-3 rounded-sm text-white text-center bg-[rgb(42,59,86)] active:bg-[rgb(19,33,55)] hover:bg-[rgb(30,46,73)]">
                  <button onClick={sortCategory}>Filter</button>
                </div>
              </div>
            </div>
            <div className="grid py-5 lg:grid-cols-5 md:grid-cols-4 xsm:grid-cols-3 grid-cols-1 m-auto place-items-center">
              {data.length > 0 ? (
                data.map((book) => {
                  const { name, _id, price, author, genre, img } = book;
                  return (
                    <div key={_id} className="flex flex-col shadow-lg m-2 relative transition-transform ease-in-out hover:scale-[1.04] bg-white rounded-lg text-center">
                      <Link
                        onClick={() => {
                          setBookId(_id);
                        }}
                        to={`books/${_id}`}
                      >
                        <div>
                          <img className="w-[250px] rounded-t-lg h-[350px]" src={img} alt="" />
                        </div>
                        <div className="flex flex-col gap-2 mt-2 text-[rgb(82,82,91)]">
                          <h1 className="font-bold">{name}</h1>
                          <h4>{author}</h4>
                        </div>
                      </Link>
                      <div className="flex flex-row justify-center mb-5 text-white">
                        <button
                          onClick={() => wishList(_id)}
                          className="bg-[rgb(42,59,86)] shadow-lg rounded-md active:bg-[rgb(19,33,55)] hover:bg-[rgb(30,46,73)] mt-3 py-1 px-3"
                        >
                          Wish List Book
                        </button>
                        {_id === bookId && isSpinning && (
                          <div className="mt-4 ml-3 text-black">
                            <i className="fa-solid fa-circle-notch fa-spin"></i>
                            {timeOut()}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="h-[500px]">
                  <i className="fa-solid fa-spinner fa-spin fa-3x"></i>
                </div>
              )}
            </div>
          </div>
          <div className="mx-auto flex flex-col">
            {isLoading && <div className="mx-auto my-3">
              <i className="fa-solid fa-spinner fa-spin fa-3x"></i>
            </div>}
            <button onClick={loadMore} className="px-6 py-2 active:bg-[rgb(19,33,55)] hover:bg-[rgb(30,46,73)] bg-[rgb(49,71,106)] text-white rounded-sm">Load More</button> 
          </div> 
      </div>
    </>
  );
};

export default Home;
