import { titleCase } from 'title-case';
import presets from './data/piece-presets';
import { Preset } from './preset.js';

const grid = document.querySelector('main');
const removeTextareaButton = document.querySelector('[data-control="remove"]');

const TEXTAREA_ATTRIBUTES = {
    contenteditable: true,
    spellcheck: false,
    class: 'textarea',
};

export function handleTextareaControl(control) {
    switch (control) {
        case 'remove':
            return removeLastTextarea;
        case 'add':
            return addNewTextarea;
        case 'clear':
            return clearAllTextAreas;
        default:
            return () => {};
    }
}

export function clearAllTextAreas() {
    const textareas = document.querySelectorAll('.textarea');
    textareas.forEach((textArea) => {
        textArea.textContent = '';
    });
}

export function addNewTextarea() {
    const div = document.createElement('div');
    for (const [attribute, value] of Object.entries(TEXTAREA_ATTRIBUTES)) {
        div.setAttribute(attribute, value);
    }

    grid.appendChild(div);

    if (grid.childElementCount > 1) {
        removeTextareaButton.disabled = false;
    }
}

export function removeLastTextarea() {
    grid.removeChild(grid.lastChild);

    if (grid.childElementCount < 2) {
        removeTextareaButton.disabled = true;
    }
}

export function generateNewTextareas(count) {
    grid.replaceChildren();
    for (let i = 0; i < count; i++) {
        addNewTextarea();
    }

    return document.querySelectorAll('.textarea');
}

export function disableButtonsExceptStop() {
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach((btn) => {
        btn.disabled = btn.dataset.control !== 'stop';
    });
}

export function enableAllButtonsExceptStop() {
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach((btn) => {
        btn.disabled = btn.dataset.control === 'stop';
    });
}

export function generatePresetButtons() {
    const presetButtonContainer = document.querySelector('#presets');
    for (const presetName of Object.keys(presets)) {
        const button = document.createElement('button');
        button.addEventListener('click', () => Preset.load(presetName));
        button.dataset.preset = presetName;
        button.textContent = titleCase(presetName).replaceAll('-', ' ');
        presetButtonContainer.append(button);
    }
}

export function underlineErrorChar(textarea, index) {
    const chars = textarea.textContent.split('');
    chars[index] = `<span class="mml-error" aria-label="MML syntax error">${chars[index]}</span>`;
    textarea.innerHTML = chars.join('');
}
