import { UI } from './ui-controller.js';

export class MMLProcessor {
    static endTimeInMS = 0;

    tempo = 100;
    currentOctave = 0;
    currentNoteDuration = '4';
    offsetFromFirstNoteInS = 0;
    notesToPlay = [];

    loadNotesToTransport(str, toneController) {
        str = MMLProcessor.removeIncompatibleChars(str).toUpperCase();
        if (!str.length) return;

        const volume = new toneController.Volume(-15).toDestination();;
        const synth = new toneController.Synth().connect(volume);
        const firstNoteStart = toneController.now();

        const units = MMLProcessor.splitStrToUnits(str);

        for (const unit of units) {
            // * adjusting "global" musical params as above
            switch (unit[0]) {
                case 'O':
                    this.currentOctave = parseInt(unit.slice(1)) - 4;
                    break;
                case '>':
                    this.currentOctave++;
                    break;
                case '<':
                    this.currentOctave--;
                    break;
                case 'L':
                    this.currentNoteDuration = unit.slice(1);
                    break;
                case 'T':
                    this.tempo = parseInt(unit.slice(1));
                    break;
                case 'R':
                    const restDurationInS = MMLProcessor.getDurationInS(
                        unit.slice(1) || this.currentNoteDuration, this.tempo
                    );
                    this.offsetFromFirstNoteInS += restDurationInS;
                    break;
                default:
                    const noteUnit = MMLProcessor.constructNoteUnit(unit, this.currentOctave, this.tempo, this.currentNoteDuration);
                    this.notesToPlay.push([noteUnit[0], noteUnit[1], firstNoteStart + this.offsetFromFirstNoteInS]);
                    this.offsetFromFirstNoteInS += noteUnit[1];
                    break;
            }
        }

        // * get duration of whole piece to trigger Tone.player.stop() on piece end
        MMLProcessor.endTimeInMS = Math.max(MMLProcessor.endTimeInMS, this.offsetFromFirstNoteInS * 1000);

        const transportID = toneController.player.scheduleOnce(() => {
            this.notesToPlay.forEach(note => {
                synth.triggerAttackRelease(note[0], note[1], note[2]);
            });
        }, 0);

        document.querySelector('#stop').addEventListener('click', (e) => {
            synth.dispose();
            toneController.player.stop();
            toneController.player.clear(transportID);
            e.target.disabled = true;
            MMLProcessor.endTimeInMS = 0;
            UI.enableBtnsNotStop();
        });
    }

    static removeIncompatibleChars(str) {
        // * remove non-MML characters
        // * as well as nonsensical combinations e.g. A. (remove only the .) / T# / L / C8- (remove only the -) etc. 
        return str.replaceAll(/(V\d*\.?)|[H-QS-Z][.#+\-]*(?!\d+)|[\s!"£$%^&*()_=?:;@'~\[\]{}`¬\\|]| (?<= [A - Z +#\-]) \.+|(?<=\d)[+#\-]/g, '');
    }

    static splitStrToUnits(str) {
        return str.match(/([A-Z]-?\+?#?\d*\.?)|<|>/g);
    }

    static constructNoteUnit(str, currentOctave = 0, tempo = 100, currentNoteLength) {
        const noteName = str.match(/[A-Z]-?\+?#?/)[0];
        const duration = str.match(/\d+\.?/) ?? [currentNoteLength];
        return [this.getFreq(noteName, currentOctave), this.getDurationInS(duration[0], tempo)];
    }

    static getDurationInS(durationAsStr, tempoInBPM) {
        const crotchetDurationInMS = 60000 / tempoInBPM;
        const noteDivisor = durationAsStr.endsWith('.') ? parseInt(durationAsStr.slice(0, -1)) / 1.5 : parseFloat(durationAsStr);
        const noteLengthInCrotchets = 4 / noteDivisor;
        return Math.round(crotchetDurationInMS * noteLengthInCrotchets) / 1000;
    }

    static getFreq(noteAsStr, currentOctave) {
        if (noteAsStr === 'R' || noteAsStr === 'P') return 0;

        const referenceFreq = 440;
        const offset = this.getOffsetFromConcertA(noteAsStr, currentOctave);
        return Math.round((2 ** (offset / 12) * referenceFreq) * 100) / 100;
    }

    static getOffsetFromConcertA(noteName, currentOctave) {
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
}