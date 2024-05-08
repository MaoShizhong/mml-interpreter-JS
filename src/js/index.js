import '../css/style.css';
import { handlePlaybackControl } from './playback.js';
import { Preset } from './preset.js';
import { generatePresetButtons, handleTextareaControl } from './ui-controller.js';

const textareaControls = document.querySelectorAll('#textarea-controls > button');
const playbackControls = document.querySelectorAll('#playback-controls > button');

textareaControls.forEach((button) => {
    button.addEventListener('click', handleTextareaControl(button.dataset.control));
});
playbackControls.forEach((button) => {
    button.addEventListener('click', handlePlaybackControl(button.dataset.control));
});

// initialise
Preset.load('mozart');
generatePresetButtons();
