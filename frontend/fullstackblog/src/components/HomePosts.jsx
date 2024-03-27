import { imagePath } from "../url";

const HomePosts = ({ post }) => {

  console.log(post);


  return (
    <div>
      <div className="w-full flex mt-8 space-x-4 rounded-lg   shadow-gray-800 bg-gray-10 transition duration-200 hover:shadow-lg">
        <div className="w-[35%] h-[200px] flex justify-center items-center">
          <img
            className="h-full w-full object-cover"
            src={imagePath+post.photo}
            alt=""
          />
        </div>

        <div className="flex flex-col w-[65%]">
          <h1 className="text-xl font-bold  md:mb-2 mb-1 md:text-2xl">
            {post.title}
          </h1>
          <div className="flex justify-between items-center  text-gray-500">
            <p>@{post.username}</p>
            <div className="  flex justify-center items-center gap-2 p-2 text-gray-500 ">
              <p>{ new Date(post.updatedAt).toString().slice(0,15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
            </div>
          </div>
          <p className="w-[75%] my-2 md:my-4">
            {post.desc.slice(0,80)+" ...Read more"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePosts;
