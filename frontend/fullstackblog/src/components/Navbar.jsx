import { Link } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import Menu from "./Menu";
import { url } from "../url";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Navbar() {
  const {user,setUser} = useContext(UserContext)
  const [prompt, setPrompt] = useState(null);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(user);
  // }, []);
  const handleClick = () => {
    setMenu(!menu);
  };
  const handleSearch = () => {
    if (prompt) {
      navigate("?search=" + prompt);
    } else {
      navigate("/");
    }
  };
   const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const res=await axios.get(url+"/api/auth/logout",{withCredentials:true})
      setUser(null);
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   console.log(prompt);
  // }, [prompt]);
  return (
    <div className="text-lg md:text-xl flex  justify-between items-center px-6 py-4 ">
      <div>
        <h1 className="font-bold">
          <Link to="/">Steven's Blog</Link>
        </h1>
      </div>
      <div className="flex  justify-between items-center gap-2">
        <MdOutlineSearch onClick={handleSearch} className=" cursor-pointer"/>
        <input
          className="outline-none"
          type="text"
          placeholder="Search Posts"
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div className="hidden md:flex md:gap-5 ">
        {!user ? (
          <Link to="/login">
            <h2>Login</h2>
          </Link>
        ) : (
          <Link to="/createpost">
            <h2>Write</h2>
          </Link>
        )}

        {!user ? (
          <Link to="/register">
            <h2>SignUp</h2>
          </Link>
        ) : (
          <Link to="/">
            <h2>Profile</h2>
          </Link>
        )}

        {user && (
          <button onClick={ handleLogout} className=" cursor-pointer">
            Logout
          </button>
        )}
      </div>

      <div className=" md:hidden">
        <RxHamburgerMenu onClick={handleClick} />
        {menu && <Menu />}
      </div>
    </div>
  );
}
