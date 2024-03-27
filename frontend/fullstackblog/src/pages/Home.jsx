import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../url";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [emptyResults, setEmptyresults] = useState(false);
  const [loader, setLoader] = useState(true);
  const {user} = useContext(UserContext)
  const { search } = useLocation();
  // console.log("this is the user",user);
  const fetchPosts = async (req, res) => {
    try {
      const response = await axios.get(url + "/api/post/" + search, {
        withCredentials: true,
      });
      setPosts(response.data);
      if (response.data.length === 0) {
        setEmptyresults(true);
      } else {
        setEmptyresults(false);
      }
      // console.log(response.data);
      setLoader(false)
    } catch (error) {
      console.log(error);
      setLoader(true)
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [search]);
  useEffect(()=>{
  console.log("these are the posts",posts)
  },[posts])
  if(user){
console.log(user,"this is the user")
}
  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !emptyResults ? (
          posts.map((post) => <Link key={post._id} to= {`/posts/post/${post._id}`} > <HomePosts  post={post} /></Link>)
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};
export default Home;
