import { Synth, Volume, now, Transport as player, start } from 'tone';
import '../css/style.css';
import { MMLProcessor } from './note-processing.js';
import { Preset } from './preset.js';
import {
    addNewTextArea,
    clearAllTextAreas,
    disableButtonsExceptStop,
    enableButtonsExceptStop,
    removeLastTextArea,
    textareas,
} from './ui-controller.js';

const Tone = { start, now, player, Volume, Synth };

const addTextAreaBtn = document.querySelector('#add-textarea');
const removeTextAreaBtn = document.querySelector('#remove-textarea');
const clearAll = document.querySelector('#clear');
const pixels = document.querySelector('#pixels');
const mozart = document.querySelector('#mozart');
const shost = document.querySelector('#shost');
const play = document.querySelector('#play');

play.addEventListener('click', async () => {
    await Tone.start();
    disableButtonsExceptStop();

    [...textareas]
        .map((textarea) => textarea.value)
        .filter((text) => text.length)
        .forEach((text) => {
            const processor = new MMLProcessor();
            processor.loadNotesToTransport(text, Tone);
        });

    Tone.player.start();

    // * automatically handles buttons on play end and allows replayability
    // * +1000ms to account for delay between pressing play and sound starting (so buttons change when sound actually ends)
    setTimeout(() => {
        enableButtonsExceptStop();
        Tone.player.stop();
        MMLProcessor.endTimeInMS = 0;
    }, MMLProcessor.endTimeInMS + 1000);
});

addTextAreaBtn.addEventListener('click', addNewTextArea);
removeTextAreaBtn.addEventListener('click', removeLastTextArea);
clearAll.addEventListener('click', clearAllTextAreas);
pixels.addEventListener('click', () => Preset.load('custom'));
mozart.addEventListener('click', () => Preset.load('mozart'));
shost.addEventListener('click', () => Preset.load('shostakovich'));

// initialise
Preset.load('mozart');
