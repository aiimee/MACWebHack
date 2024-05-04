import React, { useState, useEffect } from 'react'
import LevelBar from '../../components/LevelBar/LevelBar'
import CharacterSheet from '../../components/VirtualPet/Characters/Character1'

const TaskPage = () => {
  const [experience, setExperience] = useState(() => Number(localStorage.getItem('experience') || 0))
  const [level, setLevel] = useState(() => Number(localStorage.getItem('level') || 1))
  const [showHeart, setShowHeart] = useState(false)

  useEffect(() => {
    localStorage.setItem('experience', experience)
    localStorage.setItem('level', level)
  }, [experience, level])

  const handleExperienceChange = (newExperience) => {
    setExperience(newExperience)
  }

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel)
  }

  const addExperience = (amount) => {
    handleExperienceChange(experience + amount)
  }

  const toggleHeartAnimation = () => {
    setShowHeart(true)
    setTimeout(() => {
      setShowHeart(false)
    }, 2000)
  }

  return (
    <>
      <div className='container flex flex-col items-center justify-center'>
        {/* Cheat engine lol please comment out on final product */}
        Hacks
        <div className='row space-x-4 mb-4'>
          <button onClick={() => addExperience(10)} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>Add 10 XP</button>
          <button onClick={() => addExperience(50)} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>Add 50 XP</button>
          <button onClick={() => addExperience(100)} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>Add 100 XP</button>
        </div>
        <LevelBar
          experiencePoints={experience}
          currentLevel={level}
          onExperienceChange={handleExperienceChange}
          onLevelChange={handleLevelChange}
        />
        <div
          className='flex flex-col items-center justify-center my-5 bg-[#B0B0A6] rounded-lg shadow-pet border-4 border-[#45473F]'
          style={{ width: '359px', height: '342px' }}
        >
          <CharacterSheet
            character='character2'
            experiencePoints={experience}
            currentLevel={level}
            onExperienceChange={handleExperienceChange}
            onLevelChange={handleLevelChange}
            showHeart={showHeart}
          />
        </div>
        <button onClick={toggleHeartAnimation} className='border-2 border-[#45473F] text-black py-2 px-4 rounded-lg shadow-custom opacity-100 hover:bg-[#FFBCF0]'>🖤</button>
      </div>
    </>
  )
}

export default TaskPage
