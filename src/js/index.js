import { processMML } from './note-processing.js';
import '../css/style.css';

const playBtn = document.querySelector('button');
playBtn.addEventListener('click', () => {
    const MML = document.querySelector('textarea').value.toUpperCase();
    processMML(MML);
});