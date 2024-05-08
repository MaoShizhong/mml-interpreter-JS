import parseMml from 'mml-parser';
import { Synth, Volume, getTransport, now, start } from 'tone';
import { disableButtonsExceptStop, enableAllButtonsExceptStop } from './ui-controller';

const ONE_SECOND = 1000;
const Tone = { start, now, getTransport, Volume, Synth };
const Transport = Tone.getTransport();
const tonePlayers = [];

export function handlePlaybackControl(control) {
    switch (control) {
        case 'play':
            return play;
        case 'stop':
            return stop;
        default:
            return null;
    }
}

async function play() {
    try {
        await Tone.start();
        disableButtonsExceptStop();

        let maxLengthOfMusicInMs = 0;
        const textareas = document.querySelectorAll('textarea');
        [...textareas]
            .map((textarea) => textarea.value)
            .filter((text) => text.length)
            .forEach((text) => {
                const lengthOfMusicLoaded = loadNotesToPlayer(text, Tone);
                if (lengthOfMusicLoaded > maxLengthOfMusicInMs) {
                    maxLengthOfMusicInMs = lengthOfMusicLoaded;
                }
            });

        Transport.start();

        // automatically handles buttons on play end and allows replayability
        // +1s to account for delay between pressing play and sound starting (so buttons change when sound actually ends)
        setTimeout(() => {
            Transport.stop();
            enableAllButtonsExceptStop();
        }, maxLengthOfMusicInMs + ONE_SECOND);
    } catch (error) {
        alert(error);
        enableAllButtonsExceptStop();
    }
}

function stop() {
    tonePlayers.forEach((tonePlayer) => {
        tonePlayer.synth.dispose();
        Transport.stop();
        Transport.clear(tonePlayer.playerId);
    });

    enableAllButtonsExceptStop();
}

function loadNotesToPlayer(text, toneController) {
    const mmlTokens = parseMml(text);
    if (!mmlTokens.length) {
        return;
    }

    const volume = new toneController.Volume(-15).toDestination();
    const synth = new toneController.Synth().connect(volume);
    const toneControllerStart = toneController.now();

    const playerId = Transport.scheduleOnce(() => {
        mmlTokens.forEach((token) => {
            synth.triggerAttackRelease(
                token.pitchInHz,
                toSeconds(token.lengthInMs),
                toneControllerStart + toSeconds(token.offsetInMs)
            );
        });
    });

    tonePlayers.push({
        synth: synth,
        playerId: playerId,
    });

    return mmlTokens.at(-1).offsetInMs;
}

function toSeconds(milliseconds) {
    return milliseconds / ONE_SECOND;
}
