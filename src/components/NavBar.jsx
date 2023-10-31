import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const breakPoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

const NavLinks = ({userName, logOut}) => {
  const navigate = useNavigate();
  const wishListClick = () => {
    if (localStorage.getItem("token")) {
      navigate("/wishlist");
      return;
    }
    alert("Please Log In");
  };
  return (
    <div className="bg-[rgb(49,71,106)] leading-[3rem]">
      <div className="w-[100%]">
        <ul className="flex flex-row justify-center flex-nowrap space-x-[2rem] text-white">
          <li className="hover:bg-[rgb(30,46,73)] transition-all duration-150 w-[5rem] text-center">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:bg-[rgb(30,46,73)] transition-all duration-150 lg:w-[8rem] text-center">
            <button onClick={wishListClick}>Wish List</button>
          </li>
          <li className="hover:bg-[rgb(30,46,73)] transition-all duration-150 w-[5rem] text-center">
            <Link to="/about">About</Link>
          </li>
          {localStorage.getItem("admin") === "true" && (
            <li className="hover:bg-[rgb(30,46,73)] transition-all duration-150 lg:w-[8rem]  text-center">
              <Link to="/adminpage">Add Book</Link>
            </li>
          )}
          {!localStorage.getItem("token") && (
            <>
              <Link className="" to="/login">
                <li className="hover:bg-[rgb(30,46,73)] transition-all duration-150 px-2 rounded-sm">
                  Login
                </li>
              </Link>
              <Link className="" to="/register">
                <li className="hover:bg-[rgb(30,46,73)] transition-all duration-150 px-2 rounded-sm">
                  Register
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

const SideBar = ({ userName }) => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => setClicked(!clicked);

  const logOut = () => {
    navigate("/");
    localStorage.clear();
  };
  const wishListClick = () => {
    if (localStorage.getItem("token")) {
      navigate("/wishlist");
      return;
    }
    alert("Please Log In");
  };
  return (
    <>
      <div className="text-black w-[100%]">
        <button onClick={handleClick}>
          <i className="fa-sharp fa-solid fa-bars fa-2x"></i>
        </button>
        {clicked ? (
          <>
            <div className="bg-white z-10 text-black leading-[3rem] absolute top-[3.2rem] right-3 w-[100%]">
              <div>
                <ul className="flex flex-col p-3 font-roboto font-semibold">
                  <Link className="m-2" to="/">
                    <li className="hover:bg-[rgb(30,46,73)] transition-all duration-150 px-2 rounded-sm">
                      Home
                    </li>
                  </Link>
                  <li className="hover:bg-[rgb(30,46,73)] transition-all duration-150 ml-2 px-2 rounded-sm">
                    <button onClick={wishListClick}>Wish List</button>
                  </li>
                  <Link className="m-2" to="/about">
                    <li className="hover:bg-[rgb(30,46,73)] transition-all duration-150 px-2 rounded-sm">
                      about
                    </li>
                  </Link>
                  {localStorage.getItem("admin") === "true" && (
                    <Link className="m-2" to="/adminpage">
                      <li className="hover:bg-[rgb(30,46,73)] transition-all duration-150] px-2 rounded-sm">
                        adminpage
                      </li>
                    </Link>
                  )}
                  <hr className="mt-5 mb-5" />
                  {localStorage.getItem("token") ? (
                    <div className="flex flex-row gap-10 font-roboto">
                      <div className="text-black flex flex-col">
                        <div className="w-[10%] h-7">
                          <i class="fa-regular fa-circle-user fa-2x ml-5"></i>
                        </div>
                        <h1>Hello {userName?.split(" ")[0]}</h1>
                      </div>
                      <div className="text-white h-[50%]">
                        <button
                          onClick={logOut}
                          className="bg-[rgb(42,59,86)] hover:bg-[rgb(28,42,66)] py-1 px-3 rounded-md active:bg-[rgb(19,32,53)]"
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  ) : (
                  <>
                    <Link className="m-2" to="/login">
                      <li className="hover:bg-[rgb(30,46,73)] transition-all duration-150 px-2 rounded-sm">
                        Login
                      </li>
                    </Link>
                    <Link className="m-2" to="/register">
                      <li className="hover:bg-[rgb(30,46,73)] transition-all duration-150 px-2 rounded-sm">
                        Register
                      </li>
                    </Link>
                  </>) }
                </ul>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

const NavBar = ({ searchData, setSearchData, userName }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false)
  const { sm, md, lg, xl, xxl } = breakPoints;
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchData = await axios.get(
      `https://book-store-u2sc.onrender.com/api/v1/books?name=${search}`
    );
    setSearchData(searchData.data.books);
    console.log(searchData);
    navigate(`/search?name=${search}`);
  };
  const logOut = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <>
      <nav className="bg-white relative flex h-[70px] w-[100%]">
        <div className=" self-center ml-5 text-[rgb(49,71,106)] md:block hidden">
            <Link to="/">
              <i className="fa-solid fa-book-open-reader fa-3x"></i>
            </Link>
        </div>
        <div className="flex flex-row w-[90%] items-center justify-center ml-10">
          <div className="w-[90%] justify-self-center relative z-10">
            <form className="text-black relative">
              <div className="">
                <input
                  value={search}
                  onChange={handleChange}
                  className="w-[90%] h-[30px] px-4 rounded-sm outline-none bg-white outline-1 outline-gray-500 text-black"
                  type="text"
                  placeholder="  Search..."
                />
                <button
                  className="absolute transition-all duration-150 hover:bg-[rgb(30,46,73)] active:bg-[rgb(19,33,55)] bg-[rgb(49,71,106)] text-white h-[35.5px] -top-[2.5px] right-1 w-[20%] rounded-e-md"
                  onClick={handleSearch}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        {localStorage.getItem("token") ? (
              <div className={`md:block hidden text-black self-center mr-10 transition-all ${clicked? 'opacity-100':'opacity-30'} duration-300`}>
                <button onClick={()=>setClicked(!clicked)} className="text-[rgb(30,48,80)] cursor-pointer">
                  <i className="fa-solid fa-circle-user fa-2x text-center relative"></i>
                </button>
                {clicked? <div className={`absolute bg-white right-2 top-[80px] shadow-lg rounded-lg`}>
                  <div className="self-center p-7 flex flex-col">
                    <h1 className="px-3 py-2">Hello {userName?.split(" ")[0]}</h1>
                    <button
                      onClick={logOut}
                      className="hover:bg-[rgb(244,244,245)] px-3 py-2 rounded-lg transition-all duration-150"
                    >
                      Log Out
                    </button>
                  </div>
                </div>:null}
              </div>
          ) : null}
      </nav>
      {width > md ? (
        <NavLinks />
      ) : (
        <>
          <div className="absolute top-5 left-3 w-[100%]">
            <SideBar userName={userName} logOut={logOut}/>
          </div>
        </>
      )}
    </>
  );
};

export default NavBar;
