import { Synth, Volume, now, Transport as player, start } from 'tone';
import { MMLProcessor } from './note-processing.js';
import { disableButtonsExceptStop, enableButtonsExceptStop, textareas } from './ui-controller';

const Tone = { start, now, player, Volume, Synth };

export function handlePlaybackControl(control) {
    switch (control) {
        case 'play':
            return play;
        case 'stop':
            return;
        default:
            return () => {};
    }
}

async function play() {
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
}
