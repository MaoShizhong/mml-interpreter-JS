import { getDurationInMS } from './test-funcs.js';

describe('identifies note names and respective frequencies', () => {
    it('calculates a duration of "4" with default tempo as 600ms', () => {
        expect(getDurationInMS('4')).toBe(600);
    });
    it('calculates a duration of "4." with default tempo as 900ms', () => {
        expect(getDurationInMS('4.')).toBe(900);
    });
    it('calculates a duration of "4" at 120bpm as 500ms', () => {
        expect(getDurationInMS('4', 120)).toBe(500);
    });
    it('calculates a duration of "4." at 70bpm as 1285.7ms', () => {
        expect(getDurationInMS('4.', 70)).toBeCloseTo(1285.7, 1);
    });
    it('calculates a duration of "8." at 60bpm as 750ms', () => {
        expect(getDurationInMS('8.', 60)).toBe(750);
    });
    it('calculates a duration of "2." at 188bpm as 957.4ms', () => {
        expect(getDurationInMS('2.', 188)).toBeCloseTo(957.4, 1);
    });
    it('calculates a duration of "16" at 160bpm as 93.7ms', () => {
        expect(getDurationInMS('16', 160)).toBeCloseTo(93.7, 1);
    });
});


// describe('identifies note names and respective frequencies', () => {
//     it('associates A440 with a frequency of 440Hz', () => {
//         expect(getFreq('A')).toBe(440);
//     });
//     it('associates 3 semitones above A440 with a frequency of 523.25Hz', () => {
//         expect(getFreq('C')).toBeCloseTo(523.25, 2);
//     });
//     it('associates 3 semitones below A440 with a frequency of 369.99Hz (F#)', () => {
//         expect(getFreq('F#', -1)).toBeCloseTo(369.99, 2);
//     });
//     it('associates 3 semitones below A440 with a frequency of 369.99Hz (Gb)', () => {
//         expect(getFreq('G-', -1)).toBeCloseTo(369.99, 2);
//     });
//     it('associates 12 semitones below A440 with a frequency of 220Hz', () => {
//         expect(getFreq('A', -1)).toBe(220);
//     });
//     it('associates 26 semitones above A440 with a frequency of 1975.53Hz', () => {
//         expect(getFreq('B', 2)).toBeCloseTo(1975.53, 2);
//     });
//     it('identifies "R" as a rest - 0Hz', () => {
//         expect(getFreq('R')).toBe(0);
//     });
// });