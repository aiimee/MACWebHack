import React, { useState, useEffect } from 'react'; // Add useEffect import here
import LevelBar from '../../components/LevelBar/LevelBar';
import Done from '../../components/TasksTab/Done/Done';
import Pet from '../../components/TasksTab/Pet/Pet';
import ToDo from '../../components/TasksTab/ToDo/ToDo';
import LateTask from '../../components/TasksTab/LateTask/LateTask';
import CharacterSheet from '../../components/VirtualPet/Characters/Character1';

const TaskPage = () => {
  const [experience, setExperience] = useState(() => Number(localStorage.getItem('experience') || 0));
  const [level, setLevel] = useState(() => Number(localStorage.getItem('level') || 1));
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    localStorage.setItem('experience', experience);
    localStorage.setItem('level', level);
  }, [experience, level]);

  const addExperience = (amount) => {
    setExperience(experience + amount);
  };

  const toggleHeartAnimation = () => {
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 2000);
  };

  return (

    <div className="container mx-auto flex flex-col  justify-center items-center">
      {/* Left side todolist */}
      <div className="flex flex-col md:flex-row">
        <div className="md:1/3 m-10">
          <div>
            <h2 className="text-4xl font-bold mb-1">LATE</h2>
            <LateTask />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-1">To-Do</h2>
            <ToDo />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-1">Done</h2>
            <Done />
          </div>
        </div>

        {/* Right side pet */}
        <div className="md:w-auto m-10">
          <div className='container flex flex-col items-center justify-center'>
            Hacks
            <div className='row space-x-4 mb-4'>
              <button onClick={() => addExperience(10)} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded shadow-custom'>Add 10 XP</button>
              <button onClick={() => addExperience(50)} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded shadow-custom'>Add 50 XP</button>
              <button onClick={() => addExperience(100)} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded shadow-custom'>Add 100 XP</button>
            </div>
            <div>
              <LevelBar
                experiencePoints={experience}
                currentLevel={level}
                onExperienceChange={setExperience}
                onLevelChange={setLevel}
              />

            </div>
            <div
              className='flex flex-col items-center justify-center my-5 bg-[#FAF4E6] rounded-lg shadow-pet border-4 border-[#45473F]'
              style={{ width: '359px', height: '342px' }}
            >
              <CharacterSheet
                character='character2'
                experiencePoints={experience}
                currentLevel={level}
                onExperienceChange={setExperience}
                onLevelChange={setLevel}
                showHeart={showHeart}
              />
            </div>
            <button onClick={toggleHeartAnimation} className='border-2 border-[#45473F] text-black py-2 px-4 rounded-lg shadow-custom opacity-100 hover:bg-[#FFBCF0]'>🖤</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;

