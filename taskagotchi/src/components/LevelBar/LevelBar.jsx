import React, { useEffect } from 'react';

const LevelBar = ({ experiencePoints, onExperienceChange, currentLevel, onLevelChange }) => {
  const experienceToNextLevel = 100;  // This value can be dynamic based on the game's leveling system

  useEffect(() => {
    if (experiencePoints >= experienceToNextLevel) {
      const excessExperience = experiencePoints - experienceToNextLevel;
      onLevelChange(currentLevel + 1);
      onExperienceChange(excessExperience); // Reset experience with the overflow
    }
  }, [experiencePoints, onExperienceChange, onLevelChange, currentLevel]);

  const progressPercentage = (experiencePoints / experienceToNextLevel) * 100;

  return (
    <div
      className='relative my-5 p-1 bg-[#FAF4E6] rounded-lg shadow-custom border-[#31332C] border-2'
      style={{ width: '361px', height: '43px' }}
    >
      <div
        className='bg-[#8FC543] h-full rounded-lg'
        style={{ width: `${progressPercentage}%` }}
      ></div>
      <div
        className='absolute inset-0 flex items-center justify-center text-[#31332C] font-bold'
      >
        Level: {currentLevel}
      </div>
    </div>
  );
};

export default LevelBar;



