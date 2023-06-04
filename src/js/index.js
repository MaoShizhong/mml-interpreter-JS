import { processMML } from './note-processing.js';
import '../css/style.css';

const textArea = document.querySelector('textarea');
const playBtn = document.querySelector('button');
playBtn.addEventListener('click', () => {
    const MML = textArea.value.toUpperCase();
    if (MML.length) {
        processMML(MML);
    }
});

// * initialise
window.onload = () => textArea.value =
    'T176\nL8\nB-4RCD-4RCB-8.R16CD-E-4B-R\n'
    + 'R2D-4RB-CB-CD-E-4B-R\nE4D-E-L4ED-FB-R8\n'
    + 'RD-8E-8ED-FE8F8\nL16\nG-RFG->A-R<G->A-ARB-RCRD-RE-RB-RE-RB-R';