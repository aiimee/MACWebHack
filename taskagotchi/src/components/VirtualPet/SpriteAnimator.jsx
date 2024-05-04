import React, { useState, useEffect } from 'react'
import './SpriteAnimator.css'

const SpriteAnimator = ({ spriteSheet, frameWidth, frameHeight, frameCount, animationInterval, x, y }) => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const scale = 10

  useEffect(() => {
    const updateFrame = () => {
      setCurrentFrame(prevFrame => (prevFrame + 1) % frameCount)
    }

    const intervalId = setInterval(updateFrame, animationInterval)

    return () => clearInterval(intervalId)
  }, [frameCount, animationInterval])

  return (
    <div
      className='inline-block overflow-hidden'
      style={{
        width: `${frameWidth * scale}px`,
        height: `${frameHeight * scale}px`,
        backgroundImage: `url(${spriteSheet})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-${currentFrame * frameWidth * scale}px 0px`,
        backgroundSize: `${frameWidth * frameCount * scale}px ${frameHeight * scale}px`,
        imageRendering: 'pixelated',
        left: `${x}px`,
        top: `${y}px`
      }}
    />
  )
}

export default SpriteAnimator
