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

import char2EggClown from '../../../assets/images/character2/clownEgg.png'
import char2BabyClown from '../../../assets/images/character2/clownBaby.png'
import char2ChildClown from '../../../assets/images/character2/clownKid.png'
import char2AdultClown from '../../../assets/images/character2/clownAdult.png'
import heart from '../../../assets/images/heart.png'

// Ignore the unread variables, was planning to have multiple characters to choose from and store their levels etc on local storage
const CharacterSheet = ({ character, experiencePoints, currentLevel, onExperienceChange, onLevelChange, showHeart }) => {
  const [currentStage, setCurrentStage] = useState(() => localStorage.getItem(character + '-stage') || 'egg')

  const assets = {
    // Character 1 was for testing purposes
    character1: {
      egg: { spriteSheet: char1Idle, frames: 2, animationInterval: 1000 },
      baby: { spriteSheet: char1Idle2, frames: 2, animationInterval: 900 },
      kid: { spriteSheet: char1Eating, frames: 2, animationInterval: 800 },
      adult: { spriteSheet: char1Sleeping, frames: 2, animationInterval: 700 }
    },
    character2: {
      // Sprite sheets without the customisation reward thing
      egg: { spriteSheet: char2Egg, frames: 16, animationInterval: 1400 },
      baby: { spriteSheet: char2Baby, frames: 16, animationInterval: 1400 },
      kid: { spriteSheet: char2Child, frames: 16, animationInterval: 700 },
      adult: { spriteSheet: char2Adult, frames: 16, animationInterval: 600 },

      // Sprite sheets WITH the customisation reward thing
      eggCustom: { spriteSheet: char2EggClown, frames: 16, animationInterval: 1400 },
      babyCustom: { spriteSheet: char2BabyClown, frames: 16, animationInterval: 1400 },
      kidCustom: { spriteSheet: char2ChildClown, frames: 16, animationInterval: 700 },
      adultCustom: { spriteSheet: char2AdultClown, frames: 16, animationInterval: 600 }
    },
    heartComment: { spriteSheet: heart, frames: 1, animationInterval: 4000 }
  }

  useEffect(() => {
    localStorage.setItem(character + '-stage', currentStage)
  }, [currentStage, character])

  useEffect(() => {
    const updateStage = () => {
      if (currentLevel >= 15) setCurrentStage('adultCustom')
      else if (currentLevel >= 12) setCurrentStage('adult')
      else if (currentLevel >= 10) setCurrentStage('kidCustom')
      else if (currentLevel >= 8) setCurrentStage('kid')
      else if (currentLevel >= 5) setCurrentStage('babyCustom')
      else if (currentLevel >= 3) setCurrentStage('baby')
      else if (currentLevel >=2) setCurrentStage('eggCustom')
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
