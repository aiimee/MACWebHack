import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Five equally sized divs */}
      <div className="flex-grow flex flex-col justify-center items-center bg-[#FAF4E6]">
        <div className="bg-red-500 flex-grow w-full">Div 1</div>
        <div className="bg-blue-500 flex-grow w-full">Div 2</div>
        <div className="bg-green-500 flex-grow w-full">Div 3</div>
        <div className="bg-yellow-500 flex-grow w-full">Div 4</div>
        <div className="bg-purple-500 flex-grow w-full">Div 5</div>
      </div>
    </div>
  );
};

export default HomePage;
