import { calculateScore, validateFrameData } from "../src/bowling-score";

describe('bolwing-score', () => {
  describe('calculateScore', () => {
    it('should return the perfect score', () => {
      expect(calculateScore([
        { roll_1: 10},
        { roll_1: 10 },
        { roll_1: 10 },
        { roll_1: 10 },
        { roll_1: 10 },
        { roll_1: 10 },
        { roll_1: 10 },
        { roll_1: 10 },
        { roll_1: 10 },
        { roll_1: 10, roll_2: 10, roll_3: 10 },
      ])).toBe(300);
    });

    it('should return the 168 score', () => {
      expect(calculateScore([
        { roll_1: 10 },
        { roll_1: 9, roll_2: 1 },
        { roll_1: 8, roll_2: 1 },
        { roll_1: 7, roll_2: 3 },
        { roll_1: 10 },
        { roll_1: 6, roll_2: 4 },
        { roll_1: 5, roll_2: 3 },
        { roll_1: 9, roll_2: 1 },
        { roll_1: 10 },
        { roll_1: 7, roll_2: 3, roll_3: 8 },
      ])).toBe(168);
    });

    it('should return the 170 score', () => {
      expect(calculateScore([
        { roll_1: 7, roll_2: 3 },
        { roll_1: 10 },
        { roll_1: 9, roll_2: 1 },
        { roll_1: 8, roll_2: 1 },
        { roll_1: 7, roll_2: 3 },
        { roll_1: 10 },
        { roll_1: 6, roll_2: 4 },
        { roll_1: 5, roll_2: 3 },
        { roll_1: 9, roll_2: 1 },
        { roll_1: 10, roll_2: 9, roll_3: 1 },
      ])).toBe(170);
    });

    it('should return the 160 score', () => {
      expect(calculateScore([
        { roll_1: 8, roll_2: 1 },
        { roll_1: 6, roll_2: 4 },
        { roll_1: 10 },
        { roll_1: 9, roll_2: 1 },
        { roll_1: 8, roll_2: 1 },
        { roll_1: 7, roll_2: 3 },
        { roll_1: 10 },
        { roll_1: 8, roll_2: 1 },
        { roll_1: 7, roll_2: 3 },
        { roll_1: 9, roll_2: 1, roll_3: 7 },
      ])).toBe(160);
    });

    it('should return the 133 score', () => {
      expect(calculateScore([
        { roll_1: 0, roll_2: 0 },
        { roll_1: 5, roll_2: 3 },
        { roll_1: 7, roll_2: 3 },
        { roll_1: 10 },
        { roll_1: 9, roll_2: 1 },
        { roll_1: 8, roll_2: 1 },
        { roll_1: 7, roll_2: 3 },
        { roll_1: 6, roll_2: 4 },
        { roll_1: 5, roll_2: 3 },
        { roll_1: 10, roll_2: 8, roll_3: 1 },
      ])).toBe(133);
    });

    it('should calculate correct with less than 10 frames', () => { 
      expect(calculateScore([
        { roll_1: 0, roll_2: 0 },
        { roll_1: 5, roll_2: 3 },
      ])).toBe(8);
    });

    it('should calculate correct with empty frame data', () => {
      expect(calculateScore([
        { roll_1: 9, roll_2: 1 },
        {} as any,
      ])).toBe(10);
      expect(calculateScore([
        { roll_1: 10 },
        {} as any,
      ])).toBe(10);
    });
  });

  describe('validateFrameData', () => {
    it('should return true for valid frame data', () => {
      expect(validateFrameData({ roll_1: 10 }, false)).toBe(true);
    });

    it('should return false for invalid frame data', () => {
      expect(validateFrameData({ roll_1: 11 }, false)).toBe(false);
      expect(validateFrameData({ roll_1: 10, roll_2: 1 }, false)).toBe(false);
      expect(validateFrameData({ roll_1: 1, roll_2: 9, roll_3: 1 }, false)).toBe(false);
    });

    it('should return true for valid last frame data', () => {
      expect(validateFrameData({ roll_1: 10 }, true)).toBe(true);
      expect(validateFrameData({ roll_1: 10, roll_2: 10, roll_3: 10 }, true)).toBe(true);
    });

    it('should return false for invalid last frame data', () => {
      expect(validateFrameData({ roll_1: 10, roll_2: 11, roll_3: 10}, true)).toBe(false);
    });

  });
 
});