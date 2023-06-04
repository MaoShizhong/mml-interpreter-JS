import { processMML, audioContexts } from './note-processing.js';
import '../css/style.css';

const textAreaOne = document.querySelector('#textarea-one');
const textAreaTwo = document.querySelector('#textarea-two');
const textAreaThree = document.querySelector('#textarea-three');
const play = document.querySelector('#play');
const stop = document.querySelector('#stop');

play.addEventListener('click', () => {
    stop.disabled = false;
    play.disabled = true;
    const MML = textAreaOne.value.toUpperCase();
    if (MML.length) {
        processMML(MML);
    }
});
play.addEventListener('click', () => {
    const MML = textAreaTwo.value.toUpperCase();
    if (MML.length) {
        processMML(MML);
    }
});
play.addEventListener('click', () => {
    const MML = textAreaThree.value.toUpperCase();
    if (MML.length) {
        processMML(MML);
    }
});
stop.addEventListener('click', () => {
    audioContexts.forEach(audioCtx => audioCtx.close());
    audioContexts.length = 0;
    stop.disabled = true;
    play.disabled = false;
});

// * initialise
window.onload = () => {
    textAreaOne.value =
        'T96 L4\nE2>CCB<GF2EF2GGE2>\nCB<GF2D>A2A-<\n'
        + 'G2.CD4.E-8E>CBC8R8E4.R8<\nD2.DEFG2.>A-2<GL2.G\nT80G\nT72G\nT62G\nT48GG';
    textAreaTwo.value =
        'T96 L4 O3\nG>C<GEFGG>C<GF>B<F\nE>C<GEFGG4.>A8<GFED\n'
        + 'E4.F8EE2F8D+8L4EG+>BL8BA<G+>ABC<\nFEFG>A2<FEF>A<GRG>A<G4RG>A<G>AB\n'
        + 'CRCDC4\nT80C4CDC4\nT72C4CDCF\nT62L4E-DB-8D8\nT48L2.DE';
    textAreaThree.value =
        'T96 L4 O3\nC2CCDED2.<G2.>\nC2.CDEDG2<G4.>A8<G>\nC2.CDCB2<E>A4.L8ABC\n'
        + 'L2.DD<GG2G4>C\nT80B-\nT72A-\nT62L4B-<F>B-8D8\nT48L2.C<C';
};