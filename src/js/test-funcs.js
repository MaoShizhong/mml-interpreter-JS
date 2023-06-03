export function getDurationInMS(durationAsStr, tempoInBPM = 100) {
    const crotchetDurationInMS = 60000 / tempoInBPM;
    const noteDivisor = durationAsStr.includes('.') ? parseInt(durationAsStr[0]) / 1.5 : parseInt(durationAsStr);
    const noteLengthInCrotchets = 4 / noteDivisor;
    return crotchetDurationInMS * noteLengthInCrotchets;
}

function getFreq(noteAsStr, currentOctave = 0) {
    if (noteAsStr === 'R' || noteAsStr === 'P') return 0;

    const referenceFreq = 440;
    const offset = getOffsetFromConcertA(noteAsStr, currentOctave);
    return 2 ** (offset / 12) * referenceFreq;
}

function getOffsetFromConcertA(noteName, currentOctave) {
    const notes = { 'A': 0, 'B': 2, 'C': 3, 'D': 5, 'E': 7, 'F': 8, 'G': 10 };

    let accidental;
    if (noteName.length === 1) {
        accidental = 0;
    }
    else if (noteName[1] === '-') {
        accidental = -1;
    }
    else if (noteName[1] === '#') {
        accidental = 1;
    }

    const semitonesAboveA = notes[noteName[0]] + accidental;
    const semitonesInOctave = 12;

    return semitonesAboveA + currentOctave * semitonesInOctave;
}