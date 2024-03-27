import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { url } from "../url";
const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await axios.post(url + "/api/auth/register", {
        username,
        email,
        password,
      });
      setUserName(res.data.username);
      setPassword(res.data.password);
      setEmail(res.data.email);
      console.log(res);
      setError(false);
      navigate("/login");
    } catch (error) {
      setError(true);
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
          <Link to="/login">Login</Link>
        </div>
      </div>
      <div className="flex flex-col items-center min-w-[25vw]  min-h-[75vh] max-w-[75vw] m-auto">
        <h1 className="text-l font-bold mb-6 mt-4 text-gray-500">
          Create your new account
        </h1>
        <input
          className="w-full p-4 m-4 border rounded"
          type="text"
          placeholder="Enter your Username"
          onChange={(e) => setUserName(e.target.value)}
        />
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
        <button className="bg-gray-100 rounded p-2" onClick={handleSubmit}>
          SignUp
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
