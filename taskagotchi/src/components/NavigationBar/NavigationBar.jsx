import React from "react";
import { Link } from "react-router-dom";
import egg from "../../assets/images/egg.png";

const NavigationBar = () => {
  return (
    <div className="w-full sticky top-0 left-0 border-b-8 border-gray-800">
      <div className="flex items-center justify-between bg-[#FAF4E6] py-4 md:px-10 px-7">
        <div
          className="font-bold text-3xl cursor-pointer text-gray-800"
          style={{ imageRendering: "pixelated" }}
        >
          <img
            src={egg}
            alt="pixelated egg"
            className="mr-2 inline-block w-10 h-10"
          />
          <span className="inline-block">
            <Link to="/" className="text-gray-800 no-underline">
              TaskaGotchi
            </Link>
          </span>
        </div>
        <div className="text-2xl underline cursor-pointer text-gray-800 justify-center font-bold">
          <Link className="text-gray-800" to="/tasks">
            Tasks
          </Link>
        </div>
        <div className="text-2 cursor-pointer text-gray-800">
          <Link
            to="/login"
            className="border-2 border-[#45473F] text-black py-2 px-4 rounded-lg shadow-custom opacity-100 hover:bg-[#FFBCF0] transition duration-300"
          >
            Login/Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
