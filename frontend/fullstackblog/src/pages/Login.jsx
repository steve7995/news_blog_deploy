import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import { url } from "../url";
import { UserContext } from "../../context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const {setUser}  =useContext(UserContext)
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        url + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response);
      setUser(response.data)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex flex-col ">
      <div className="px-8 flex justify-between items-center mt-4">
        <h1 className="text-xl font-bold">
          <Link to="/">Steven's Blog</Link>
        </h1>

        <div className="flex gap-2 items-center justify-center">
          <Link to="/register">Register</Link>
        </div>
      </div>
      <div className="flex flex-col items-center min-w-[25vw]  min-h-[75vh] max-w-[75vw] m-auto">
        <h1 className="text-l font-bold mb-6 mt-4 text-gray-500">
          Login to your account
        </h1>
        <input
          className="w-full p-4 m-4 border rounded"
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-4 m-4  border rounded"
          type="password"
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-gray-100 rounded p-2" onClick={handleLogin}>
          Login
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
