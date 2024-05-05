import React from 'react'

const LevelBar = ({ experiencePoints, onExperienceChange, currentLevel, onLevelChange }) => {
  const experienceToNextLevel = 100 // This could be dynamic or fetched from a settings context

  // Trigger level change if experience exceeds the required amount
  React.useEffect(() => {
    if (experiencePoints >= experienceToNextLevel) {
      const excessExperience = experiencePoints - experienceToNextLevel
      onLevelChange(currentLevel + 1)
      onExperienceChange(excessExperience) // Reset experience with the overflow
    }
  }, [experiencePoints, experienceToNextLevel, onExperienceChange, onLevelChange, currentLevel])

  const progressPercentage = (experiencePoints / experienceToNextLevel) * 100

  return (
    <div
      className='flex items-center justify-center my-5 p-1 bg-[#FAF4E6] rounded-lg shadow-custom relative border-[#31332C] border-2'
      style={{ width: '361px', height: '43px' }}
    >
      <div className='relative w-full h-full rounded-lg overflow-hidden'>
        <div
          className='absolute top-1 left-1 right-1 bottom-1 bg-[#8FC543] rounded-lg'
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className='absolute w-full text-left pl-5 pr-5 align-middle text-[#31332C] font-bold'>
        Level: {currentLevel}
      </div>
    </div>
  )
}

export default LevelBar
