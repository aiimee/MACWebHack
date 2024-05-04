import React, { useEffect, useState } from 'react';
import SpriteAnimator from '../SpriteAnimator';
import LevelBar from '../../LevelBar/LevelBar';
import char1Idle from '../../../assets/images/character1/idle.png'
import char1Idle2 from '../../../assets/images/character1/idle2.png'
import char1Eating from '../../../assets/images/character1/eating.png'
import char1Sleeping from '../../../assets/images/character1/sleeping.png'

const CharacterSheet = ({ character, experiencePoints, currentLevel, onExperienceChange, onLevelChange }) => {
  const [currentStage, setCurrentStage] = useState(() => {
    // Load the initial stage from local storage or default to 'egg'
    return localStorage.getItem(character + '-stage') || 'egg';
  });

  // Dynamic assets based on character and stage
  const assets = {
    // TEST character
    'character1': {
      egg: { spriteSheet: char1Idle, frames: 2 },
      baby: { spriteSheet: char1Idle2, frames: 2 },
      kid: { spriteSheet: char1Eating, frames: 2 },
      adult: { spriteSheet: char1Sleeping, frames: 2 }
    },
    // 'character2': {
    //   egg: { spriteSheet: 'character2-egg.png', frames: 5 },
    //   baby: { spriteSheet: 'character2-baby.png', frames: 7 },
    //   kid: { spriteSheet: 'character2-kid.png', frames: 9 },
    //   adult: { spriteSheet: 'character2-adult.png', frames: 11 }
    // },
    // Add more characters here
  };

  useEffect(() => {
    localStorage.setItem(character + '-stage', currentStage);
  }, [currentStage, character]);

  useEffect(() => {
    // Update the stage based on the current level
    const updateStage = () => {
      if (currentLevel >= 10) {
        setCurrentStage('adult');
      } else if (currentLevel >= 6) {
        setCurrentStage('kid');
      } else if (currentLevel >= 3) {
        setCurrentStage('baby');
      } else {
        setCurrentStage('egg');
      }
    };

    updateStage();
  }, [currentLevel]);

  // Get animation settings from assets based on the current character and stage
  const animationSettings = assets[character][currentStage];

  return (
    <div>
      <div className='character-container'>
        <SpriteAnimator
          spriteSheet={animationSettings.spriteSheet}
          frameWidth={32}
          frameHeight={16}
          frameCount={animationSettings.frames}
          animationInterval={500}
        />
      </div>
      <LevelBar
        experiencePoints={experiencePoints}
        currentLevel={currentLevel}
        onExperienceChange={onExperienceChange}
        onLevelChange={onLevelChange}
      />
    </div>
  );
};

export default CharacterSheet;


