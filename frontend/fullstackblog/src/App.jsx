import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Postdetails from "./pages/Postdetails";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import {UserContextProvider} from '../context/UserContext'
import EditPost from "./pages/EditPost";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts/post/:id" element={<Postdetails />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/profile" element = {<Profile/>} />
        <Route path="/edit/:id" element={<EditPost/>}/>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
