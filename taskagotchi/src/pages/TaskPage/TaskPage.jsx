import React, { useState, useEffect } from 'react';
import LevelBar from '../../components/LevelBar/LevelBar';
import CharacterSheet from '../../components/VirtualPet/Characters/Character1';

const TaskPage = () => {
  const [experience, setExperience] = useState(() => Number(localStorage.getItem('experience') || 0));
  const [level, setLevel] = useState(() => Number(localStorage.getItem('level') || 1));

  useEffect(() => {
    localStorage.setItem('experience', experience);
    localStorage.setItem('level', level);
  }, [experience, level]);

  const handleExperienceChange = (newExperience) => {
    setExperience(newExperience);
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
  };

  const addExperienceForTesting = (amount) => {
    handleExperienceChange(experience + amount);
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          <button onClick={() => addExperienceForTesting(10)}>Add 10 XP</button>
          <button onClick={() => addExperienceForTesting(50)}>Add 50 XP</button>
          <button onClick={() => addExperienceForTesting(100)}>Add 100 XP</button>
        </div>
        <LevelBar
            experiencePoints={experience}
            currentLevel={level}
            onExperienceChange={handleExperienceChange}
            onLevelChange={handleLevelChange}
          />
        <div
          className='flex flex-col items-center justify-center my-5 bg-[#B0B0A6] rounded-lg shadow-pet border-4 border-[#45473F]'
          style={{ width: '359px', height: '342px'}}
        >
          <CharacterSheet
            character="character2"
            experiencePoints={experience}
            currentLevel={level}
            onExperienceChange={handleExperienceChange}
            onLevelChange={handleLevelChange}
          />
        </div>

      </div>
    </>
  );
};

export default TaskPage;



