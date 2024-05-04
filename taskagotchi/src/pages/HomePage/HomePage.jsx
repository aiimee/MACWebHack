import React from "react";
import bookCharacter from "../../assets/images/BunnyBook.png";
import speedReading from "../../assets/images/speedReading.png";
import vacation from "../../assets/images/party.png";
import sucess from "../../assets/images/sucess.png";
import strategy from "../../assets/images/strategy.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex flex-col justify-center">
        {/* First section  */}
        <div className="bg-[#FAF4E6] flex-grow w-full text-black flex justify-center">
          <div className="max-w-screen-lg flex items-center">
            <img
              alt="character with book"
              src={bookCharacter}
              className="size-80 pt-5 pb-5 ml-20 mr-20"
            />
            <div className="text-center w-70 ml-35">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Meet TaskaGotchi
              </h1>
              <p className="ml-8">
                Where your productivity feeds your digital pet. Complete tasks,
                level up, and bring joy to both your life and your virtual
                buddy!
              </p>
              <div className="mt-5">
                {loggedInUser ? (
                  <Link
                    to="/tasks"
                    className="border-2 border-black text-black py-2 px-4 rounded shadow-custom opacity-100"
                  >
                    Meet your TaskaGotchi Today
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="border-2 border-black text-black py-2 px-4 rounded shadow-custom opacity-100"
                  >
                    Meet your TaskaGotchi Today
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Second section  */}
        <div className="bg-[#45473F] flex-grow w-full text-white flex justify-center">
          <div className="max-w-screen-lg flex items-center">
            <div className="text-center w-70 mr-20">
              <h1 className="text-2xl font-bold text-white-800 mb-4 font-bold">
                Engage Daily
              </h1>
              <p>Nurture your productivity, one task at a time</p>
              <div className="mt-5">
                {loggedInUser ? (
                  <Link
                    to="/tasks"
                    className="border-2 border-[#FAF4E6] text-white mt-5 py-2 px-4 rounded shadow-light opacity-100"
                  >
                    Start Your Journey
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="border-2 border-[#FAF4E6] text-white mt-5 py-2 px-4 rounded shadow-light opacity-100"
                  >
                    Start Your Journey
                  </Link>
                )}
              </div>
            </div>
            <img
              alt="task"
              src={speedReading}
              className="size-80 ml-20 mr-10"
            />
          </div>
        </div>
        {/* Third section  */}
        <div className="bg-[#FAF4E6] flex-grow w-full text-black flex justify-center">
          <div className="max-w-screen-lg flex items-center">
            <img
              alt="character with book"
              src={sucess}
              className="size-80 pt-5 pb-5 ml-20 mr-20"
            />
            <div className="text-center w-70 ml-35">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Cultivate Success
              </h1>
              <p className="ml-8">
                Plant your goals and watch them grow. Every task completed helps
                your digital companion thrive.
              </p>
              <div className="mt-5">
                {loggedInUser ? (
                  <Link
                    to="/tasks"
                    className="border-2 border-black text-black py-2 px-4 rounded shadow-custom opacity-100"
                  >
                    Grow with us
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="border-2 border-black text-black py-2 px-4 rounded shadow-custom opacity-100"
                  >
                    Grow with us
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Fourth section  */}
        <div className="bg-[#45473F] flex-grow w-full text-white flex justify-center">
          <div className="max-w-screen-lg flex items-center">
            <div className="text-center w-70 mr-20">
              <h1 className="text-2xl font-bold text-white-800 mb-4 font-bold">
                Strategize Smartly
              </h1>
              <p>Organise your tasks with intuitive priority settings. </p>
              <div className="mt-5">
                {loggedInUser ? (
                  <Link
                    to="/tasks"
                    className="border-2 border-[#FAF4E6] text-white mt-5 py-2 px-4 rounded shadow-light opacity-100"
                  >
                    Plan Your Path
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="border-2 border-[#FAF4E6] text-white mt-5 py-2 px-4 rounded shadow-light opacity-100"
                  >
                    Plan Your Path
                  </Link>
                )}
              </div>
            </div>
            <img alt="task" src={strategy} className="size-80 ml-20 mr-10" />
          </div>
        </div>
        {/* Fifth section  */}
        <div className="bg-[#FAF4E6] flex-grow w-full text-black flex justify-center mb-10">
          <div className="max-w-screen-lg flex items-center">
            <img
              alt="character with book"
              src={vacation}
              className="size-80 pt-5 pb-5 ml-20 mr-20"
            />
            <div className="text-center w-70 ml-35">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Reward Yourself
              </h1>
              <p className="ml-8">
                Cross off tasks and collect treasures. Every achievement brings
                joy not just to you, but also to your digital buddy.
              </p>
              <div className="mt-5">
                {loggedInUser ? (
                  <Link
                    to="/tasks"
                    className="border-2 border-black text-black py-2 px-4 rounded shadow-custom opacity-100"
                  >
                    Claim Your Rewards
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="border-2 border-black text-black py-2 px-4 rounded shadow-custom opacity-100"
                  >
                    Claim Your Rewards
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
