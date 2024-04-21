import '../css/style.css';
import { handlePlaybackControl } from './playback.js';
import { Preset } from './preset.js';
import { handleTextareaControl } from './ui-controller.js';

const presetButtons = document.querySelectorAll('#presets > button');
const textareaControls = document.querySelectorAll('#textarea-controls > button');
const playbackControls = document.querySelectorAll('#playback-controls > button');

presetButtons.forEach((button) => {
    button.addEventListener('click', () => Preset.load(button.dataset.preset));
});
textareaControls.forEach((button) => {
    button.addEventListener('click', handleTextareaControl(button.dataset.control));
});
playbackControls.forEach((button) => {
    button.addEventListener('click', handlePlaybackControl(button.dataset.control));
});

// initialise
Preset.load('mozart');
