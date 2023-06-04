import * as Tone from 'tone';
import { loadPresetCustom, loadPresetMozart } from './presets.js';
import { processMML } from './note-processing.js';
import '../css/style.css';

const pixels = document.querySelector('#pixels-in-the-night-sky');
const mozart = document.querySelector('#mozart');
const textAreas = document.querySelectorAll('textarea');
const play = document.querySelector('#play');
const stop = document.querySelector('#stop');

play.addEventListener('click', async () => {
    await Tone.start();
    stop.disabled = false;
    play.disabled = true;
    [...textAreas].map(textArea => textArea.value)
        .filter(text => text.length)
        .forEach(text => processMML(text, Tone));
    Tone.Transport.start();
});
pixels.addEventListener('click', () => loadPresetCustom());
mozart.addEventListener('click', () => loadPresetMozart());

// * initialise
loadPresetCustom();