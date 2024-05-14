import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  //   let history = useNavigate();

  // useEffect(() => {
  //   axios.get("http://localhost:27438/posts").then((response) => {
  //     setListOfPosts(response.data);
  //   });
  // }, []);

  return (
    <main className="flex bg-gradient-to-r from-[#e0c3c3] to-white min-h-screen flex-col items-center gap-2 p-8 sm:p-24">
      {/* Video Background */}
      
      
      <div className="hero relative flex flex-column items-center mt-6 z-10">
        {/* Text */}
        <div className="">
          <h1 className="text-4xl lg:text-6xl font-bold text-[#c44444] mb-4">
            Welcome to Dashboard
          </h1>
        
          {/* <button className="bg-[#2174ea] text-white font-bold mr-4 p-2 rounded w-1/4">
            About
          </button>
          <button className="bg-[#334155] text-white font-bold p-2 rounded w-1/4">
            Contact Us
          </button> */}
        </div>
        {/* Image */}
      </div>
     
    </main>
  );
}

export default Home;
