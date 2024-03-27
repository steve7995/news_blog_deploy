import React from "react";

const ProfilePosts = () => {
  return (
    <div className="flex space-x-2 gap-2 md:gap-4 rounded-lg   shadow-gray-800 bg-gray-10 transition duration-200 hover:shadow-lg">
      <img
        className="w-[20%] h-auto   "
        src="https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=717/https://s3.cointelegraph.com/uploads/2024-03/02c04500-aef0-4280-a463-9e804c88a7b3.jpg"
        alt=""
      />
      <div>
        <h1 className="font-bold">
          Orange Domains aims to expand Bitcoin Name System functionality
        </h1>
        <div className="flex justify-between items-center  text-gray-500">
          <p>@astro</p>
          <div className="  flex justify-center items-center gap-2 p-2 text-gray-500 ">
            <p> 04/03/2024</p>
            <p>22:53</p>
          </div>
        </div>
        {/* <p className="w-[75%] my-2 md:my-4">
            Orange Domains seeks to expand the use cases of BNS domains while
            creating more interconnectivity with traditional DNS-based
            domains.Trust Machines, a Bitcoin infrastructure development firm,
            announced the launch of a new entity, Orange Domains, which aims to
            expand the functionality of the Bitcoin Name System (BNS) through
            decentralized applications and to better connect thtraditional
            Domain Name System (DNS) with Web3 digital identity.
          </p> */}
      </div>
    </div>
  );
};

export default ProfilePosts;
