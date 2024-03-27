import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Comments from "../components/Comments";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { url } from "../url.js";
import { imagePath } from "../url.js";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { UserContext } from "../../context/UserContext.jsx";
import { useContext } from "react";
const Postdetails = () => {
  const { user } = useContext(UserContext);
  // console.log('this is the user',user)
  const [post, setPost] = useState({});
  const post_id = useParams().id;
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [allcomments, setAllcomments] = useState([]);
  const fetchPosts = async () => {
    const response = await axios.get(url + "/api/post/" + post_id);
    setPost(response.data);
    // console.log("This is the response", response);
  };
  useEffect(() => {
    fetchPosts();
  }, [post_id]);

  const deltePost = async () => {
    const res = await axios.delete(url + "/api/post/" + post_id, {
      withCredentials: true,
    });
    console.log("deleted post", res);
    navigate("/");
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(url + "/api/comment/post/" + post_id);
      console.log("fetched comments", response);
      console.log(post_id);
      setAllcomments(response.data);
      // console.log(allcomments,"<=All comments")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
    console.log("all comments", allcomments);
  }, [post_id]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        url + "/api/comment/create",
        {
          comment: comment,
          author: user.username,
          PostId: post_id,
          userId: user.id,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className=" p-2 md:px-[80px] lg:px-[100px] flex flex-col  rounded-lg  ">
        <img
          className="w-full  mx-auto mt-8 "
          src={imagePath + post.photo}
          alt=""
        />
        <div className="mt-[50px]">
          <div className="flex items-center justify-between ">
            <h1 className="font-bold ">{post.title}</h1>
            <div className="flex gap-1">
              <p className=" cursor-pointer">
                <Link to={"/edit/" + post_id}>
                  <BiEdit />
                </Link>
              </p>
              <p className=" cursor-pointer" onClick={deltePost}>
                <MdDelete />
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center  text-gray-500">
            <p>@{post.username}</p>
            <div className="  flex justify-center items-center gap-2 p-2 text-gray-500 ">
              <p> {new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <p className="my-2 md:my-4">{post.desc}</p>
        </div>
        <div className="flex space-x-2 items-center mt-[5%]">
          <p className="font-bold">Categories:</p>

          <div className="flex space-x-2  items-center">
            {post.categories &&
              post.categories.map((item) => (
                <div
                  key={item}
                  className="bg-gray-300 rounded px-3 py-1 transition duration-200 shadow-lg hover:shadow-gray-400 hover:cursor-pointer "
                >
                  {item}
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col mt-[2%]">
          <p className="font-bold">Comments:</p>
          {allcomments &&
            allcomments.map((com) => (
              <Comments key={com._id} com={com} post={post} />
            ))}

          <div className="flex items-center  gap-x-2 mt-[1%]">
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder="enter your comment"
              className="p-2  bg-gray-100  w-[85%] rounded"
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="bg-black text-white p-2 rounded-lg transition duration-200 shadow-md hover:shadow-red-400"
              onClick={postComment}
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Postdetails;
