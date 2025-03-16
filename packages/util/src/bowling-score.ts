
export const MAX_FRAMES = 10;
export const MAX_NUMBER_OF_PLAYERS = 4;

export const calculateScore = (frames: { roll_1: number, roll_2?: number, roll_3?: number }[]): number => {
  const rolls = frames.reduce((acc, { roll_1, roll_2, roll_3 }, index) => {
    const isLastFrame = index === frames.length - 1;
    const rollOne = roll_1
    const rollTwo = (roll_2 || 0)
    const rollThree = (roll_3 || 0)

    const frame_rolls = [{ roll: rollOne , isStrike: rollOne === 10, isSpare: false, isLastFrame }];
    if (rollTwo) {
      frame_rolls.push({ roll: rollTwo, isStrike: false, isSpare: rollOne + rollTwo === 10, isLastFrame });
    }
    if (rollThree) {
      frame_rolls.push({ roll: rollThree, isStrike: false, isSpare: false, isLastFrame });
    }
    return [...acc, ...frame_rolls];

  }, [] as { roll: number, isStrike: boolean, isSpare: boolean, isLastFrame: boolean }[]);

  let score = 0;
  for (let i = 0; i < rolls.length; i++) {
    const { isStrike, isSpare, isLastFrame, roll = 0 } = rolls[i] || {}
    if (isStrike && !isLastFrame) {
      score += roll + (rolls[i + 1]?.roll || 0) + (rolls[i + 2]?.roll || 0);
    } else if (isSpare && !isLastFrame) {
      score += roll + (rolls[i + 1]?.roll || 0);
    } else {
      score += roll;
    }
  }
  return score;
} 

export const validateFrameData = (frame: { roll_1: number, roll_2?: number, roll_3?: number }, isLastFrame: boolean): boolean => {
  const { roll_1, roll_2, roll_3 } = frame;
  const rollOne = roll_1;
  const rollTwo = (roll_2 || 0);
  const rollThree = (roll_3 || 0);

  if (rollThree && !isLastFrame) {
    return false;
  }

  if (rollOne + rollTwo > 10 && !isLastFrame) {
    return false;
  }

  if (rollOne + rollTwo + rollThree > 30 && isLastFrame) {
    return false;
  }

  return rollOne <= 10 && rollTwo <= 10 && rollThree <= 10;
}
