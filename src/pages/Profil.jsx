import { AiOutlineGithub } from "react-icons/ai"; 
import { AiOutlineInstagram } from "react-icons/ai"; 
import { AiOutlineTwitter } from "react-icons/ai"; 
import React from 'react';
const Profil = () => {
  return (
    <div className="max-w-lg mx-auto my-10 bg-[#EDEDED] rounded-lg shadow-md p-5 border-[1px]">
      <img className="w-32 h-32 rounded-full mx-auto object-cover border-[1px]" src="https://www.webiconio.com/_upload/255/image_255.svg" alt="Profile picture"/>
        <h2 className="text-center text-2xl font-semibold mt-3">John Doe</h2>
        <p className="text-center text-gray-600 mt-1">Software Engineer</p>
        <div className="flex justify-center mt-5">
          <a href="#" className="text-blue-500 text-[30px] hover:text-blue-700 mx-3"><AiOutlineTwitter /></a>
          <a href="#" className="text-red-500 text-[30px] hover:text-red-700 mx-3"><AiOutlineInstagram /></a>
          <a href="#" className="text-gray-500 text-[30px] hover:text-gray-700 mx-3"><AiOutlineGithub /></a>
        </div>
        <div className="mt-5">
          <h3 className="text-xl font-semibold">Bio</h3>
          <p className="text-gray-600 mt-2">John is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js.</p>
        </div>
    </div>
  );
};

export default Profil;
