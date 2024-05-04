import React, { useState, useEffect } from 'react';
import './SpriteAnimator.css'

const SpriteAnimator = ({ spriteSheet, frameWidth, frameHeight, frameCount, animationInterval }) => {
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        const updateFrame = () => {
            setCurrentFrame(prevFrame => (prevFrame + 1) % frameCount);
        };

        const intervalId = setInterval(updateFrame, animationInterval);

        return () => clearInterval(intervalId);
    }, [frameCount, animationInterval]);

    return (
        <div
            className="inline-block overflow-hidden image-pixelated"
            style={{
                width: `${frameWidth}px`,
                height: `${frameHeight}px`,
                backgroundImage: `url(${spriteSheet})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: `-${currentFrame * frameWidth}px 0px`,
                transform: `scale(10)` 
            }}
        />
    );
};

export default SpriteAnimator;

