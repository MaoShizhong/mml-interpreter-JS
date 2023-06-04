import { splitStrToUnits } from './test-funcs.js';

describe('Takes a multi-unit string and returns an array of each note unit as str', () => {
    it('splits a 3 note string\n"C4D#8.A2" -> ["C4", "D#8.", "A2"]', () => {
        expect(splitStrToUnits('C4D#8.A2')).toEqual(["C4", "D#8.", "A2"]);
    });
    it('splits a 7 note string\n"C4D#8.R8R8A-2.B16A2" -> ["C4", "D#8.", "R8", "R8", "A-2.", "B16", "A2"]', () => {
        expect(splitStrToUnits('C4D#8.R8R8A-2.B16A2')).toEqual(["C4", "D#8.", "R8", "R8", "A-2.", "B16", "A2"]);
    });
    it('splits a 3 note string with octave changes\n"C4>D#8.A2" -> ["C4", ">", "D#8.", "A2"]', () => {
        expect(splitStrToUnits('C4D#8.A2')).toEqual(["C4", ">", "D#8.", "A2"]);
    });
    it('splits a 3 note string with length locks\n"C4D#8.L2A" -> ["C4", "D#8.", "L2", "A"]', () => {
        expect(splitStrToUnits('C4D#8.L2A')).toEqual(["C4", "D#8.", "L2", "A"]);
    });
    it('splits a 7 note string with multiple octave changes and length locks\n"L4.CD#L8R<RA-2.B16>A2" -> ["L4.", "C", "D#", "L8", "R", "<", "R", "A-2.", "B16", ">", "A2]', () => {
        expect(splitStrToUnits('L4.CD#L8R<RA-2.B16>A2')).toEqual(["L4.", "C", "D#", "L8", "R", "<", "R", "A-2.", "B16", ">", "A2"]);
    });
});

// describe('Split string into note name and duration, then process to array', () => {
//     it('A4 gives 440Hz, 600ms', () => {
//         expect(constructNoteUnit('A4')).toEqual([440, 600]);
//     });
//     it('C16. gives ~523.25Hz, 225ms', () => {
//         expect(constructNoteUnit('C16.')).toEqual([523.2511306011972, 225]);
//     });
//     it('F#8. gives ~739.99Hz, 450ms', () => {
//         expect(constructNoteUnit('F#8.')).toEqual([739.9888454232689, 450]);
//     });
//     it('E-2. gives ~622.25Hz, 1800ms', () => {
//         expect(constructNoteUnit('E-2.')).toEqual([622.2539674441618, 1800]);
//     });
// });

// describe('identifies note names and respective frequencies', () => {
//     it('calculates a duration of "4" with default tempo as 600ms', () => {
//         expect(getDurationInMS('4')).toBe(600);
//     });
//     it('calculates a duration of "4." with default tempo as 900ms', () => {
//         expect(getDurationInMS('4.')).toBe(900);
//     });
//     it('calculates a duration of "4" at 120bpm as 500ms', () => {
//         expect(getDurationInMS('4', 120)).toBe(500);
//     });
//     it('calculates a duration of "4." at 70bpm as 1285.7ms', () => {
//         expect(getDurationInMS('4.', 70)).toBeCloseTo(1285.7, 1);
//     });
//     it('calculates a duration of "8." at 60bpm as 750ms', () => {
//         expect(getDurationInMS('8.', 60)).toBe(750);
//     });
//     it('calculates a duration of "2." at 188bpm as 957.4ms', () => {
//         expect(getDurationInMS('2.', 188)).toBeCloseTo(957.4, 1);
//     });
//     it('calculates a duration of "16" at 160bpm as 93.7ms', () => {
//         expect(getDurationInMS('16', 160)).toBeCloseTo(93.7, 1);
//     });
// });


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