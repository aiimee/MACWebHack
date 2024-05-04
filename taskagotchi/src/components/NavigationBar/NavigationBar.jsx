import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="w-full fixed top-0 left-0">
      <div className="flex items-center justify-between bg-[#FAF4E6] py-4 md:px-10 px-7">
        <div className="font-bold text-3xl cursor-pointer text-gray-800">
          TaskaGotchi
        </div>
        <div className="text-2xl underline cursor-pointer text-gray-800">
          About Us
        </div>
        <div className="text-2xl cursor-pointer text-gray-800">Login</div>
      </div>
    </div>
  );
};

export default NavigationBar;
