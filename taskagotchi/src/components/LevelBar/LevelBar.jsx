import React, { useState, useEffect } from 'react';

const LevelBar = ({ experiencePoints }) => {
    const [currentExperience, setCurrentExperience] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(1);
    // Initial experience required for the next level
    const [experienceToNextLevel, setExperienceToNextLevel] = useState(100); 

    useEffect(() => {
        if (experiencePoints > 0) {
          addExperience(experiencePoints);
        }
    }, [experiencePoints]);

    const addExperience = (newExperience) => {
        let newTotalExperience = currentExperience + newExperience;
        while (newTotalExperience >= experienceToNextLevel) {
            newTotalExperience -= experienceToNextLevel;
            setCurrentLevel(currentLevel => currentLevel + 1);
            // Incrementally increase the XP needed for the next level
            setExperienceToNextLevel(experienceToNextLevel => experienceToNextLevel + 50); 
        }
        setCurrentExperience(newTotalExperience);
    };

    const progressPercentage = (currentExperience / experienceToNextLevel) * 100;

    return (
        // Level Bar
        <div className='flex items-center justify-center my-5 p-1 bg-[#FAF4E6] rounded-lg shadow-custom relative border-[#31332C] border-2'
             style={{ width: '365px', height: '43px' }}>
            {/* Exp bar */}
            <div className='relative w-full h-full rounded-lg overflow-hidden'> 
                <div className='absolute top-1 left-1 right-1 bottom-1 bg-[#8FC543] rounded-lg'
                     style={{ width: `${progressPercentage}%` }}></div> 
            </div>
            <div className='absolute w-full text-left pl-5 align-middle text-[#31332C] font-bold'>
                Level: {currentLevel}
            </div>
        </div>
    );
};

export default LevelBar;


