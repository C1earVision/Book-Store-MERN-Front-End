import { Alert } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setUserName }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onUserDataChange = (e, name) => {
    setUserData({ ...userData, [name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = await axios
      .post(
        "https://book-store-u2sc.onrender.com/api/v1/auth/register",
        userData
      )
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
      <div className="flex items-center h-[100vh]">
        <div className="flex justify-center rounded-md sm:min-h-[70vh] min-h-[60vh] bg-[rgb(34,34,34)] sm:w-[40%] w-[80%] m-auto text-white">
          <form className="flex flex-col w-[70%] justify-center gap-5">
            <div className="m-auto font-bold text-2xl">
              <h1>Register</h1>
            </div>
            <div className="flex flex-col gap-2">
              <label>Name</label>
              <input
                value={userData.name}
                onChange={(e, name = "name") => onUserDataChange(e, name)}
                className="w-[100%] p-2 text-black outline-none rounded-sm"
                type="text"
                name="email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                value={userData.email}
                onChange={(e, name = "email") => onUserDataChange(e, name)}
                className="w-[100%] p-2 text-black outline-none rounded-sm"
                type="text"
                name="email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <input
                value={userData.password}
                onChange={(e, name = "password") => onUserDataChange(e, name)}
                className="w-[100%] p-2 text-black outline-none rounded-sm"
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
                className="px-4 py-2 hover:bg-[rgb(92,46,138)] rounded-md bg-[rgb(145,63,226)] cursor-pointer"
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

export default Register;
