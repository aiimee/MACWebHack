import React, { useEffect, useState } from 'react'
import SpriteAnimator from '../SpriteAnimator'
import char1Idle from '../../../assets/images/character1/idle.png'
import char1Idle2 from '../../../assets/images/character1/idle2.png'
import char1Eating from '../../../assets/images/character1/eating.png'
import char1Sleeping from '../../../assets/images/character1/sleeping.png'
import char2Egg from '../../../assets/images/character2/egg.png'
import char2Baby from '../../../assets/images/character2/baby.png'
import char2Child from '../../../assets/images/character2/kid.png'
import char2Adult from '../../../assets/images/character2/adult.png'
import heart from '../../../assets/images/heart.png'

const CharacterSheet = ({ character, experiencePoints, currentLevel, onExperienceChange, onLevelChange, showHeart }) => {
  const [currentStage, setCurrentStage] = useState(() => localStorage.getItem(character + '-stage') || 'egg')

  const assets = {
    character1: {
      egg: { spriteSheet: char1Idle, frames: 2, animationInterval: 1000 },
      baby: { spriteSheet: char1Idle2, frames: 2, animationInterval: 900 },
      kid: { spriteSheet: char1Eating, frames: 2, animationInterval: 800 },
      adult: { spriteSheet: char1Sleeping, frames: 2, animationInterval: 700 }
    },
    character2: {
      egg: { spriteSheet: char2Egg, frames: 16, animationInterval: 1400 },
      baby: { spriteSheet: char2Baby, frames: 16, animationInterval: 1400 },
      kid: { spriteSheet: char2Child, frames: 16, animationInterval: 700 },
      adult: { spriteSheet: char2Adult, frames: 16, animationInterval: 600 }
    },
    heartComment: { spriteSheet: heart, frames: 1, animationInterval: 4000 }
  }

  useEffect(() => {
    localStorage.setItem(character + '-stage', currentStage)
  }, [currentStage, character])

  useEffect(() => {
    const updateStage = () => {
      if (currentLevel >= 10) setCurrentStage('adult')
      else if (currentLevel >= 6) setCurrentStage('kid')
      else if (currentLevel >= 3) setCurrentStage('baby')
      else setCurrentStage('egg')
    }

    updateStage()
  }, [currentLevel])

  const animationSettings = assets[character][currentStage]

  return (
    <div className='character-container'>
      <div className='pl-24'>
        {showHeart && (
          <SpriteAnimator
            spriteSheet={assets.heartComment.spriteSheet}
            frameWidth={32}
            frameHeight={16}
            frameCount={assets.heartComment.frames}
            animationInterval={assets.heartComment.animationInterval}
            scale={2}
          />
        )}
      </div>
      <div>
        <SpriteAnimator
          spriteSheet={animationSettings.spriteSheet}
          frameWidth={32}
          frameHeight={16}
          frameCount={animationSettings.frames}
          animationInterval={animationSettings.animationInterval}
          scale={6}
        />

      </div>
    </div>
  )
}

export default CharacterSheet
