export function interpretDuration() {
}

export function getNote(letter, octave = 0, hertz = 440) {
    const notes = { 'A': 1, 'B': 3, 'C': 4, 'D': 6, 'E': 8, 'F': 9, 'G': 11, };
    let accidental = 0;
    if (letter.length > 1 && letter[1] === '-') {
        accidental = -1;
    }
    else if (letter.length > 1 && letter[1] === '#') {
        accidental = 1;
    }

    const note = notes[letter[0]] + accidental;
    // const octaveShift = 1 / (2 ** octave);

    return note;
}