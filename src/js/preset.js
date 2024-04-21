import presets from './data/piece-presets.js';
import { generateNewTextareas } from './ui-controller.js';

export class Preset {
    static load(name) {
        const piece = new Preset(name);
        piece.#load();
    }

    #data;
    #partsCount;

    constructor(name) {
        this.#data = presets[name] ?? [];
        this.#partsCount = this.#data.length;
    }

    #load() {
        const textareas = generateNewTextareas(this.#partsCount);
        textareas.forEach((textarea, i) => (textarea.value = this.#data[i]));
    }
}
