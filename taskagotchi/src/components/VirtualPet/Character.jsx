import React from 'react'
import character1 from '../../assets/images/character1.png'
import SpriteAnimator from './SpriteAnimator'

const Character = () => {
  const spriteSheet = character1
  const frameWidth = 16
  const frameHeight = 16
  const frameCount = 8
  const animationInterval = 6000

  return (
    <div
      className='flex flex-col items-center justify-center my-5 p-4 bg-[#B0B0A6] rounded-lg shadow-custom'
      style={{ width: '359px', height: '342px' }}
    >
      <SpriteAnimator
        spriteSheet={spriteSheet}
        frameWidth={frameWidth}
        frameHeight={frameHeight}
        frameCount={frameCount}
        animationInterval={animationInterval}
      />
    </div>
  )
}

export default Character
