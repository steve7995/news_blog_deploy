import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { url } from "../url";
import axios from "axios";
const Menu = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const res=await axios.get(url+"/api/auth/logout",{withCredentials:true})
      setUser(null);
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-black absolute top-12 right-4 flex flex-col gap-1 p-2 rounded-lg">
      {!user && (
        <h3 className="text-white">
          <Link to="#">Login</Link>
        </h3>
      )}
      {!user && (
        <h3 className="text-white">
          <Link to="#">SignUp</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white">
          <Link to="#">Profile</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white">
          <Link to="#">Write</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white">
          <Link to="#">MyBlogs</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white cursor-pointer">
          <p onClick={handleLogout}> Logout</p>
        </h3>
      )}
    </div>
  );
};
export default Menu;
