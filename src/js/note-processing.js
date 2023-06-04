export async function processMML(str) {
    str = removeIncompatibleChars(str);
    const units = splitStrToUnits(str);

    let tempo = 100;
    let currentOctave = 0;
    let currentNoteDuration = 4;
    console.log(units);

    for (const unit of units) {
        console.log(unit);

        // * adjusting "global" musical params as above
        switch (unit[0]) {
            case 'O':
                currentOctave = parseInt(unit.slice(1)) - 4;
                console.log({ currentOctave });
                break;
            case '>':
                currentOctave++;
                console.log({ currentOctave });
                break;
            case '<':
                currentOctave--;
                console.log({ currentOctave });
                break;
            case 'L':
                const len = unit.slice(1);
                currentNoteDuration = len.includes('.') ? parseInt(len) / 1.5 : parseInt(len);
                console.log({ currentNoteDuration });
                break;
            case 'T':
                tempo = unit.slice(1);
                console.log({ tempo });
                break;
            default:
                const noteUnit = constructNoteUnit(unit, currentOctave, tempo, currentNoteDuration);
                playNote(noteUnit);
                await delay(noteUnit[1]);
                break;
        }
    };
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function playNote(noteUnit) {
    const audioCtx = new AudioContext();
    const pureTone = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    pureTone.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    pureTone.frequency.setValueAtTime(noteUnit[0], audioCtx.currentTime);
    gainNode.gain.value = 0.08;
    pureTone.start();
    const durationInMS = noteUnit[1] / 1000 - 0.02;
    pureTone.stop(durationInMS);
}

function removeIncompatibleChars(str) {
    // * remove non-MML characters
    // * as well as nonsensical combinations e.g. A. (remove only the .) / T# / L / C8- (remove only the -) etc. 
    return str.replaceAll(/(V\d*\.?)|[H-QS-Z][.#+\-]*(?!\d+)|[\s!"£$%^&*()_=?:;@'~\[\]{}`¬\\|]|(?<=[A-Z+#\-])\.+|(?<=\d)[+#\-]/g, '');
}

function splitStrToUnits(str) {
    return str.match(/([A-Z]-?\+?#?\d*\.?)|<|>/g);
}

function constructNoteUnit(str, currentOctave = 0, tempo = 100, currentNoteLength) {
    const noteName = str.match(/[A-Z]-?\+?#?/)[0];
    const duration = str.match(/\d+\.?/) ?? [currentNoteLength.toString()];
    return [getFreq(noteName, currentOctave), getDurationInMS(duration[0], tempo)];
}

function getDurationInMS(durationAsStr, tempoInBPM) {
    const crotchetDurationInMS = 60000 / tempoInBPM;
    const noteDivisor = durationAsStr.includes('.') ? parseInt(durationAsStr.slice(0, -1)) / 1.5 : parseInt(durationAsStr);
    const noteLengthInCrotchets = 4 / noteDivisor;
    return Math.round(crotchetDurationInMS * noteLengthInCrotchets);
}

function getFreq(noteAsStr, currentOctave) {
    if (noteAsStr === 'R' || noteAsStr === 'P') return 0;

    const referenceFreq = 440;
    const offset = getOffsetFromConcertA(noteAsStr, currentOctave);
    return Math.round((2 ** (offset / 12) * referenceFreq) * 100) / 100;
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
    else if (noteName[1] === '#' || noteName[1] === '+') {
        accidental = 1;
    }

    const semitonesAboveA = notes[noteName[0]] + accidental;
    const semitonesInOctave = 12;

    return semitonesAboveA + currentOctave * semitonesInOctave;
}