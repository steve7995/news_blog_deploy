import React from "react";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";

const Profile = () => {
  return (
    <div className=" p-2">
      <Navbar />
      <div className="flex gap-1 mt-[50px] ">
        <div className="flex flex-col gap-5 border border-gray-300 rounded-lg">
          <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts />
        </div>

        <div className=" md:w-[75%]">
          <form action="" className="flex flex-col">
            <input
              type="text"
              placeholder="enter your name"
              className=" rounded-lg outline-none border border-r-gray-300 p-2 m-2"
            />
            <input
              type="email"
              name=""
              id=""
              placeholder="enter your email"
              className="  rounded-lg outline-none  border border-r-gray-300 p-2 m-2"
            />
            <div className="flex gap-x-2  p-2 m-2">
              <button className="bg-blue-300 p-2 rounded-lg">Update</button>
              <button className="bg-blue-300 p-2 rounded-lg">delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
