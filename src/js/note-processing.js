export function processMML(str, toneController) {
    const volume = new toneController.Volume(-15).toDestination();;
    const synth = new toneController.Synth().connect(volume);
    const firstNoteStart = toneController.now();
    str = removeIncompatibleChars(str);

    if (!str.length) return;

    const units = splitStrToUnits(str);

    let tempo = 100;
    let currentOctave = 0;
    let currentNoteDuration = '4';
    let offsetFromFirstNoteInS = 0;

    const notesToPlay = [];

    for (const unit of units) {
        // * adjusting "global" musical params as above
        switch (unit[0]) {
            case 'O':
                currentOctave = parseInt(unit.slice(1)) - 4;
                break;
            case '>':
                currentOctave++;
                break;
            case '<':
                currentOctave--;
                break;
            case 'L':
                currentNoteDuration = unit.slice(1);
                break;
            case 'T':
                tempo = parseInt(unit.slice(1));
                break;
            case 'R':
                const restDurationInS = getDurationInS(unit.slice(1) || currentNoteDuration, tempo);
                offsetFromFirstNoteInS += restDurationInS;
                break;
            default:
                const noteUnit = constructNoteUnit(unit, currentOctave, tempo, currentNoteDuration);
                notesToPlay.push([noteUnit[0], noteUnit[1], firstNoteStart + offsetFromFirstNoteInS]);
                offsetFromFirstNoteInS += noteUnit[1];
                break;
        }
    }

    const transportID = toneController.Transport.schedule(() => {
        notesToPlay.forEach(note => synth.triggerAttackRelease(note[0], note[1], note[2]));
    }, 0);

    document.querySelector('#stop').addEventListener('click', (e) => {
        synth.dispose();
        toneController.Transport.stop();
        toneController.Transport.clear(transportID);
        e.target.disabled = true;
        document.querySelector('#play').disabled = false;
    });
}

function removeIncompatibleChars(str) {
    // * remove non-MML characters
    // * as well as nonsensical combinations e.g. A. (remove only the .) / T# / L / C8- (remove only the -) etc. 
    return str.replaceAll(/(V\d*\.?)|[H-QS-Z][.#+\-]*(?!\d+)|[\s!"£$%^&*()_=?:;@'~\[\]{}`¬\\|]| (?<= [A - Z +#\-]) \.+|(?<=\d)[+#\-]/g, '');
}

function splitStrToUnits(str) {
    return str.match(/([A-Z]-?\+?#?\d*\.?)|<|>/g);
}

function constructNoteUnit(str, currentOctave = 0, tempo = 100, currentNoteLength) {
    const noteName = str.match(/[A-Z]-?\+?#?/)[0];
    const duration = str.match(/\d+\.?/) ?? [currentNoteLength];
    return [getFreq(noteName, currentOctave), getDurationInS(duration[0], tempo)];
}

function getDurationInS(durationAsStr, tempoInBPM) {
    const crotchetDurationInMS = 60000 / tempoInBPM;
    const noteDivisor = durationAsStr.endsWith('.') ? parseInt(durationAsStr.slice(0, -1)) / 1.5 : parseFloat(durationAsStr);
    const noteLengthInCrotchets = 4 / noteDivisor;
    return Math.round(crotchetDurationInMS * noteLengthInCrotchets) / 1000;
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