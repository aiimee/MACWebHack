import React from "react";
import bookCharacter from "../../assets/images/BunnyBook.png";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex flex-col justify-center">
        <div className="bg-[#FAF4E6] flex-grow w-full text-black flex justify-center">
          <div className="max-w-screen-lg flex items-center">
            <img
              alt="character with book"
              src={bookCharacter}
              className="size-96 mr-10"
            />
            <div className="text-center w-70 ml-35">
              <h1 className="text-2xl font-bold text-gray-800 mb-4 ml-">
                Meet TaskaGotchi
              </h1>
              <p className="ml-8">
                Where your productivity feeds your digital pet. Complete tasks,
                level up, and bring joy to both your life and your virtual
                buddy!
              </p>
              <button className="border-2 border-black text-black mt-5 py-2 px-4 rounded shadow-custom opacity-100">
                Meet your TaskaGotchi Today
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#45473F] flex-grow w-full text-white">Div 2</div>
        <div className="bg-[#FAF4E6] flex-grow w-full text-black">Div 3</div>
        <div className="bg-[#45473F] flex-grow w-full text-white ">Div 4</div>
        <div className="bg-[#FAF4E6] flex-grow w-full text-black">Div 5</div>
      </div>
    </div>
  );
};

export default HomePage;
