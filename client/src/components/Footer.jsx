import React from "react";
import { BsFacebook, BsTwitter, BsYoutube, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="w-screen mt-12 flex flex-col border-t-[3px]">
      <div className="w-full flex gap-[min(5%,1rem)] justify-center mt-6 text-[1.2rem]">
        <BsFacebook />
        <BsInstagram />
        <BsTwitter />
        <BsYoutube></BsYoutube>
      </div>
      <p className="leading-6 text-center mt-4">&#169; 2025 Manuel Nieto</p>
    </div>
  );
};

export default Footer;
