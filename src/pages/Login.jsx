import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import axios from "axios";

const Login = ({ setUserName }) => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [error, setError] = useState("");
  const onEmailChange = (e) => {
    setUserEmail(e.target.value);
  };
  const onPassChange = (e) => {
    setUserPass(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = await axios
      .post("https://book-store-u2sc.onrender.com/api/v1/auth/login", {
        email: userEmail,
        password: userPass,
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
    localStorage.setItem("token", user.data.token);
    localStorage.setItem("admin", user.data.user.admin);
    localStorage.setItem("name", user.data.user.name);
    setUserName(localStorage.getItem("name"));
    navigate("/");
  };
  return (
    <>
      <div className="flex items-center text-black h-[100vh] font-roboto">
        <div className="flex justify-center rounded-md sm:min-h-[50vh] min-h-[40vh] bg-white sm:w-[40%] w-[80%] m-auto">
          <form className="flex flex-col w-[70%] justify-center gap-5">
            <div className="m-auto font-bold text-2xl">
              <h1>Sign In</h1>
            </div>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                value={userEmail}
                onChange={onEmailChange}
                className="w-[100%] p-2 text-black border border-black outline-none rounded-sm"
                type="text"
                name="email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <input
                value={userPass}
                onChange={onPassChange}
                className="w-[100%] p-2 text-black border border-black outline-none rounded-sm"
                type="password"
                name="pass"
                required
              />
            </div>
            <div className="m-auto">
              <input
                type="submit"
                onClick={onSubmit}
                value="Sign In"
                className="px-4 py-2 hover:bg-[rgb(27,42,65)] text-white rounded-md bg-[rgb(42,59,86)] cursor-pointer"
              />
            </div>
            {error && (
              <Alert className="mb-3" severity="error">
                {error}
              </Alert>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
