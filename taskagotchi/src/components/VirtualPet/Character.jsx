import React from 'react';
import character1 from '../../assets/images/character1.png';
import SpriteAnimator from './SpriteAnimator';

const Character = () => {
    const spriteSheet = character1;
    const frameWidth = 16;
    const frameHeight = 16;
    const frameCount = 8;
    const animationInterval = 6000;

    return (
        <div className="flex flex-col items-center justify-center my-5">
            <h3 className="text-lg font-bold mb-4">My Animated Character</h3>
            <SpriteAnimator
                spriteSheet={spriteSheet}
                frameWidth={frameWidth}
                frameHeight={frameHeight}
                frameCount={frameCount}
                animationInterval={animationInterval}
            />
        </div>
    );
};

export default Character;

