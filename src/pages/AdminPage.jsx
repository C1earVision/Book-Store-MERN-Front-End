import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const AdminPage = () => {
  const navigate = useNavigate();
  const [dataChanged, setDataChanged] = useState({
    name: "",
    author: "",
    authorDetails:"",
    price: "",
    genre: "",
    discreption: "",
  });
  const [img, setImg] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    if (localStorage.getItem("admin") === "false") {
      navigate("/");
    }
  }, []);

  const ChangeData = (e, field) => {
    setDataChanged({ ...dataChanged, [field]: e.target.value });
  };
  const dataSubmit = async () => {
    await axios
      .request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        url: `https://book-store-u2sc.onrender.com/api/v1/user/admin`,
        data: { ...dataChanged, img },
      })
      .then(() => setSuccess(true))
      .catch((err) => {
        setSuccess(false);
        setError(err?.response?.data?.msg);
      });
  };

  const addImage = async (e) => {
    await convertImg(e.target.files[0]);
  };

  const convertImg = (img) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(img);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    }).then((res) => setImg(res));
  };
  return (
    <>
      <div className="lg:w-[70%] md:w-[90%] sm:w-[90%] w-[100%] m-auto bg-white rounded-lg mt-[5%]">
        <h1 className="text-black p-3  text-xl">Add Book</h1>
        <hr />
        <div className="flex flex-col p-5 gap-3">
          <div className="flex flex-col text-white">
            <h1 className="bg-[rgb(49,71,106)] p-2 rounded-sm">
              Upload Image:{" "}
            </h1>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-10 m-5">
              <h1>Image: </h1>
              <input
                onChange={addImage}
                type="file"
                label="Image"
                name="img"
                id="img-upload"
                accept=".jpeg, .png, .jpg"
              />
            </div>
          </div>

          <div className="flex flex-col text-white">
            <h1 className="bg-[rgb(49,71,106)] p-2 rounded-sm">Add Name: </h1>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-5 m-5">
              <label>Name:</label>
              <input
                value={dataChanged.name}
                onChange={(e) => ChangeData(e, "name")}
                className="rounded-sm border border-black p-1 ml-5 md:w-[18.5%] w-[50%] outline-none"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col text-white">
            <h1 className="bg-[rgb(49,71,106)] p-2 rounded-sm">
              Add Author:{" "}
            </h1>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-3 m-5">
              <label>Author:</label>
              <input
                value={dataChanged.author}
                onChange={(e) => ChangeData(e, "author")}
                className="rounded-sm border border-black text-black p-1 ml-5 md:w-[18.5%] w-[50%] outline-none"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col text-white">
            <h1 className="bg-[rgb(49,71,106)] p-2 rounded-sm">
              Add Author details:{" "}
            </h1>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-5 m-5">
              <label>Details:</label>
              <input
                value={dataChanged.authorDetails}
                onChange={(e) => ChangeData(e, "authorDetails")}
                className="rounded-sm text-black ml-5 border border-black md:w-[50%] w-[90%] p-5 outline-none"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col text-white">
            <h1 className="bg-[rgb(49,71,106)] p-2 rounded-sm">Add Price: </h1>
            <div className="w-[90%] self-center flex flex-row items-center text-black gap-6 m-5">
              <label>price:</label>
              <input
                value={dataChanged.price}
                onChange={(e) => ChangeData(e, "price")}
                className="rounded-sm text-black border border-black p-1 ml-5 md:w-[18.5%] w-[50%] outline-none"
                type="number"
              />
            </div>
          </div>

          <div className="flex flex-col text-white">
            <h1 className="bg-[rgb(49,71,106)] p-2 rounded-sm">Add Genre: </h1>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-5 m-5">
              <label>Genre:</label>
              <input
                value={dataChanged.genre}
                onChange={(e) => ChangeData(e, "genre")}
                className="rounded-sm text-black border border-black p-1 ml-5 md:w-[18.5%] w-[50%] outline-none"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col text-white">
            <h1 className="bg-[rgb(49,71,106)] p-2 rounded-sm">
              Add Discreption:{" "}
            </h1>
            <div className="w-[90%] text-black self-center flex flex-row items-center gap-5 m-5">
              <label>discreption:</label>
              <input
                value={dataChanged.discreption}
                onChange={(e) => ChangeData(e, "discreption")}
                className="rounded-sm text-black border border-black ml-5 md:w-[50%] w-[90%] p-5 outline-none"
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="w-[100%] gap-5 flex">
          <button
            onClick={dataSubmit}
            className="bg-[rgb(49,71,106)] m-auto mb-5 active:bg-[rgb(30,45,77)] hover:bg-[rgb(45,63,99)] text-white w-[40%] p-2 rounded-sm"
          >
            Add Book
          </button>
        </div>

        <div className="w-[90%] m-auto">
          {success && <Alert severity="success">Book Successfully Added</Alert>}
          {success === false ? <Alert severity="error">{error}</Alert> : null}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
