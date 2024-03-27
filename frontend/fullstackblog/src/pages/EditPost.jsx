import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import axios from "axios";
import { url } from "../url";

import { UserContext } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { user } = useContext(UserContext);
  //   console.log("this is the user", user);
  const postId = useParams().id;
  const navigate = useNavigate();
  const addtoCategory = (e) => {
    e.preventDefault();
    let updatedList = [...listofCategories];
    updatedList.push(category);
    setListofCategories(updatedList);
    setCategory("");
  };
  const delteCategory = (event, index) => {
    event.preventDefault();
    let newList = [...listofCategories];
    newList.splice(index, 1);
    setListofCategories(newList);
  };
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFlie] = useState("");
  const [category, setCategory] = useState("");
  const [listofCategories, setListofCategories] = useState([]);

  const getPostDetails = async () => {
    try {
      const res = await axios.get(url + "/api/post/" + postId, {
        withCredentials: true,
      });
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFlie(res.data.photo);
      setListofCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, [postId]);

  const handleForm = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      categories: listofCategories,
      username: user.username,
      userId: user._id,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      try {
        const multerResponse = await axios.post(url + "/fileUpload", data);
      } catch (error) {
        console.log("multer error", error);
      }
    }

    try {
      const res = await axios.put(url + "/api/post/" + postId, post, {
        withCredentials: true,
      });

      // console.log("this is the post",post)
      // console.log(res);
      navigate("/posts/post/" + res.data._id);
    } catch (error) {
      console.log("error while creating post", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-[150px] py-4 ">
        <h1 className=" text-2xl font-bold">Create Post:</h1>
        <form action="" className=" flex flex-col">
          <input
            type="text"
            className=" border rounded-lg border-teal-500 outline-none  w-[50%] px-2 py-1  m-2"
            placeholder="Enter post title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            className=" px-2 py-1  m-2"
            onChange={(e) => setFlie(e.target.files[0])}
          />
          <div className="mt-4">
            <input
              type="text"
              className="border  rounded-lg border-teal-500 outline-none  w-[20%] px-2 py-1  m-2"
              placeholder="enter your category "
              onChange={(e) => setCategory(e.target.value)}
            />

            <button
              className=" bg-gray-300  rounded-lg p-2"
              onClick={addtoCategory}
            >
              Add
            </button>
          </div>

          {/* display categories */}

          <div className="flex px-2 py-1 mt-4">
            {listofCategories?.map((item, index) => (
              <div
                key={index}
                className=" bg-gray-300  mx-2 rounded-lg p-2 flex items-center justify-center gap-2"
              >
                {item}
                <button onClick={(index) => delteCategory(index)}>
                  <ImCross />
                </button>
              </div>
            ))}
          </div>

          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={15}
            cols={30}
            className="px-4 py-2 mx-2 mt-4 outline-none border
border-teal-500 rounded-lg "
            placeholder="Enter post description"
          />
          <button
            className=" mx-2 mt-4 md:w-[20%] bg-gray-300  rounded-lg p-2"
            onClick={handleForm}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditPost;
