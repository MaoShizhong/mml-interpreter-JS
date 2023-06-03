import { getFreq } from './test-funcs.js';

describe('identifies note names and respective frequencies', () => {
    it('associates A440 with a frequency of 440Hz', () => {
        expect(getFreq('A')).toBe(440);
    });
    it('associates 3 semitones above A440 with a frequency of 523.25Hz', () => {
        expect(getFreq('C')).toBeCloseTo(523.25, 2);
    });
    it('associates 3 semitones below A440 with a frequency of 369.99Hz (F#)', () => {
        expect(getFreq('F#', -1)).toBeCloseTo(369.99, 2);
    });
    it('associates 3 semitones below A440 with a frequency of 369.99Hz (Gb)', () => {
        expect(getFreq('G-', -1)).toBeCloseTo(369.99, 2);
    });
    it('associates 12 semitones below A440 with a frequency of 220Hz', () => {
        expect(getFreq('A', -1)).toBe(220);
    });
    it('associates 26 semitones above A440 with a frequency of 1975.53Hz', () => {
        expect(getFreq('B', 2)).toBeCloseTo(1975.53, 2);
    });
});