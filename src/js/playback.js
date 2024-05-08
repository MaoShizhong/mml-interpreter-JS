import parseMml from 'mml-parser';
import { Synth, Volume, now, Transport as player, start } from 'tone';
import { disableButtonsExceptStop, enableButtonsExceptStop, textareas } from './ui-controller';

const ONE_SECOND = 1000;
const Tone = { start, now, player, Volume, Synth };
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

        [...textareas]
            .map((textarea) => textarea.value)
            .filter((text) => text.length)
            .forEach((text) => {
                const lengthOfMusicLoaded = loadNotesToPlayer(text, Tone);
                if (lengthOfMusicLoaded > maxLengthOfMusicInMs) {
                    maxLengthOfMusicInMs = lengthOfMusicLoaded;
                }
            });

        Tone.player.start();

        // automatically handles buttons on play end and allows replayability
        // +1s to account for delay between pressing play and sound starting (so buttons change when sound actually ends)
        setTimeout(() => {
            Tone.player.stop();
            enableButtonsExceptStop();
        }, maxLengthOfMusicInMs + ONE_SECOND);
    } catch (error) {
        alert(error);
        enableButtonsExceptStop();
    }
}

function stop() {
    tonePlayers.forEach((tonePlayer) => {
        tonePlayer.synth.dispose();
        tonePlayer.player.stop();
        tonePlayer.player.clear(tonePlayer.playerId);
    });

    enableButtonsExceptStop();
}

function loadNotesToPlayer(text, toneController) {
    const mmlTokens = parseMml(text);
    if (!mmlTokens.length) {
        return;
    }

    const volume = new toneController.Volume(-15).toDestination();
    const synth = new toneController.Synth().connect(volume);
    let noteStartOffsetInS = toneController.now();

    const playerId = toneController.player.scheduleOnce(() => {
        mmlTokens.forEach((token) => {
            synth.triggerAttackRelease(
                token.pitchInHz,
                toSeconds(token.lengthInMs),
                noteStartOffsetInS
            );
            noteStartOffsetInS += toSeconds(token.lengthInMs);
        });
    });

    tonePlayers.push({
        synth: synth,
        player: toneController.player,
        playerId: playerId,
    });

    return toMilliseconds(noteStartOffsetInS);
}

function toSeconds(milliseconds) {
    return milliseconds / ONE_SECOND;
}

function toMilliseconds(seconds) {
    return seconds * ONE_SECOND;
}
