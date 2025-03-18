import React from "react";
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-10 border border-gray-400">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <p className="text-gray-600 text-sm text-center md:text-left">
        &copy; 2025 Company Ltd. All rights reservered.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0 items-center">
          <BsFacebook className="text-xl text-gray-600 hover:text-blue-600 transition cursor-pointer" />
          <RiInstagramFill className="text-xl text-gray-600 hover:text-pink-500 transition cursor-pointer" />
          <AiFillTwitterCircle className="text-2xl text-gray-600 hover:text-blue-400 transition cursor-pointer" />
          <AiFillLinkedin className="text-2xl text-gray-600 hover:text-blue-700 transition cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
