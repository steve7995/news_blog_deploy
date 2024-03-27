import axios from "axios";
import { url } from "../url";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
const Comments = ({ com, post }) => {
  const { user } = useContext(UserContext);
  console.log(user);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(url + "/api/comment/" + com._id, {
        withCredentials: true,
      });
      console.log(res);
      window.location.reload(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-200 rounded-lg w-[85%] mt-[10px] mb-[10px]">
      <div className="flex justify-between items-center  text-gray-500">
        <p>@{user.username}</p>
        <div className="  flex justify-center items-center gap-2 p-2 text-gray-500 ">
          <p>{new Date(com.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(com.updatedAt).toString().slice(16, 24)}</p>
          {user.id === com._id && (
            <button
              className=" bg-black text-cyan-600 rounded-lg p-2"
              onClick={handleDelete}
            >
              delete
            </button>
          )}
        </div>
      </div>
      <p className="p-2 text-lg">good</p>
    </div>
  );
};

export default Comments;
