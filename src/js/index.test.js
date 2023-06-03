import { getNote, splitToSingleUnit, interpretOctave, interpretNote, interpretDuration } from './test-funcs.js';

describe('identifies note names and respective frequencies', () => {
    it('identifies "A" with a default octave as note 1', () => {
        expect(getNote('A')).toBe(1);
    });
    it('identifies "C" with a default octave to be 4', () => {
        expect(getNote('C')).toBe(4);
    });
    it('identifies "G" with a default octave to be 11', () => {
        expect(getNote('G')).toBe(11);
    });
    it('identifies "D#" with a default octave to be 7', () => {
        expect(getNote('D#')).toBe(7);
    });
    it('identifies "G-" with a default octave to be 10', () => {
        expect(getNote('G-')).toBe(10);
    });
});