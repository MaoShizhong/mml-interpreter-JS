import { start, now, Transport as player, Volume, Synth } from 'tone';
import { UI } from './ui-controller.js';
import { Presets } from './presets.js';
import { MMLProcessor } from './note-processing.js';
import '../css/style.css';

const Tone = { start, now, player, Volume, Synth };

const addTextAreaBtn = document.querySelector('#add-textarea');
const removeTextAreaBtn = document.querySelector('#remove-textarea');
const pixels = document.querySelector('#pixels');
const mozart = document.querySelector('#mozart');
const play = document.querySelector('#play');

play.addEventListener('click', async () => {
    await Tone.start();
    UI.disableBtnsWhenPlaying();

    [...UI.textAreas].map(textArea => textArea.value)
        .filter(text => text.length)
        .forEach(text => {
            const processor = new MMLProcessor();
            processor.loadNotesToTransport(text, Tone);
        });

    Tone.player.start();

    // * automatically handles buttons on play end and allows replayability
    // * +1000ms to account for delay between pressing play and sound starting (so buttons change when sound actually ends)
    setTimeout(() => {
        UI.enableBtnsNotStop;
        Tone.player.stop();
        MMLProcessor.endTimeInMS = 0;
    }, MMLProcessor.endTimeInMS + 1000);
});

addTextAreaBtn.addEventListener('click', UI.addNewTextArea);
removeTextAreaBtn.addEventListener('click', UI.removeLastTextArea);
pixels.addEventListener('click', Presets.loadPresetCustom);
mozart.addEventListener('click', Presets.loadPresetMozart);

// * initialise
Presets.loadPresetMozart();