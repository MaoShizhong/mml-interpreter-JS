import { UI } from './ui-controller.js';

export class Presets {
    static setNumberOfTextAreas(n) {
        while (UI.textAreas.length > n) {
            UI.removeLastTextArea();
        }
        while (UI.textAreas.length < n) {
            UI.addNewTextArea();
        }
    }

    static loadPresetCustom() {
        Presets.setNumberOfTextAreas(3);
        UI.textAreas[0].value =
            'T96 L4\nE2>CCB<GF2EF2GGE2>\nCB<GF2D>A2A-<\n'
            + 'G2.CD4.E-8E>CBC8R8E4.R8<\nD2.DEFG2.>A-2<GL2.G\nT80G\nT72G\nT62G\nT48GG';
        UI.textAreas[1].value =
            'T96 L4 O3\nG>C<GEFGG>C<GF>B<F\nE>C<GEFGG4.>A8<GFED\n'
            + 'E4.F8EE2F8D+8L4EG+>BL8BA<G+>ABC<\nFEFG>A2<FEF>A<GRG>A<G4RG>A<G>AB\n'
            + 'CRCDC4\nT80C4CDC4\nT72C4CDCF\nT62L4E-DB-8D8\nT48L2.DE';
        UI.textAreas[2].value =
            'T96 L4 O3\nC2CCDED2.<G2.>\nC2.CDEDG2<G4.>A8<G>\nC2.CDCB2<E>A4.L8ABC\n'
            + 'L2.DD<GG2G4>C\nT80B-\nT72A-\nT62L4B-<F>B-8D8\nT48L2.C<C';
    }

    static loadPresetMozart() {
        Presets.setNumberOfTextAreas(3);
        UI.textAreas[0].value =
            'T152L8\nF2>ARCRF2.RC>A<GFEDCB-AB-4G2\nRG>B-A<GFEDCB-A4F2R2\n'
            + 'L4B-DF>B-2A2<G#R8F8G#R8F8E2R\nCL2FG>AR4L8<CCF4RFG4RG>A2R4\nL16A<G>AB-CRCRCRCRCRCRCRCR<F2R4\n'
            + 'FEFG>ARARARARARARARAR<D2R4\nDCDEFRFRFRCRGRGRGRCR\n>AR<FR>ARCRFRCRDRB-RCR<FR>ARCRFRCRDRB-RC4R4<\n'
            + 'F4.F8G2>B-2<C2.D8E8F2R4>\nL16A<G>AB-CRCRCRCRCRCRCRCR<F2R4\nFEFG>ARARARARARARARAR<D2R4\n'
            + 'DCDEFRFRFRCRGRGRGRCR\n>AR<FR>ARCRFRCRDRB-RCR<FR>ARCRFRCRDRB-RC4R4<\nF2G4.G8>A-4.A-8A2<F2C2.D8E8F4';
        UI.textAreas[1].value =
            'T152L8\nF2FR>AR<FRFR>ARCRFRR4B-A<GF\nGG>B-DGB-DGC4R4CB-A<G>\n'
            + 'A<F>ACFACFB-4<\nFR>B-RDRFFFFFFFF<FF4>A-<FF4>A-<GR2.\nE>C4RAC4R<EFR2.D>C4RAC4R<E\n'
            + 'F>CCCCCCCCEEEEEEEDAAAAAAAECCCCCCCF<FFFFFFFL4>FRERCR\nL8ARB-RA4R4ARB-RA4R4\n'
            + 'AAAADDDDDDDD<GE4E4EFG>\nACCCCCCCCEEEEEEEDAAAAAAAECCCCCCCF<FFFFFFFL4>FRERCR\n'
            + 'L8ARB-RA4R4ARB-RA4R4<\nCCCCDDDDFFFFFFFFCCAA\nE4C8.C16E4C8.C16F4';
        UI.textAreas[2].value =
            'T152O3L8\nFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF\nEEEEEEEEE-E-E-E-E-E-E-E-D4R2.>\n'
            + 'DDDDCCCCBBBBBBBBL16CRL8CBCBCB-<G\nL16>ARCRAR<FRERGRERCR\nFRL8>CBCBCB-<G\n'
            + 'L16>ARCRAR<FRERGRERCR\nFR>FRFRFRFRFRFRFRE2R2\nR8DRDRDRDRDRDRDRC2R2\n'
            + 'R8B-RB-RB-RB-RB-RB-RB-RL4AR<CRFR>\nL8FRFRFR4.FRFRF4R4\nDDDDB-B-B-B-<GGGG>CCCC<CCCCF>\n'
            + 'FFFFFFFE2R2RDDDDDDDC2R2\nRB-B-B-B-B-B-B-L4AR<CRFR>\nL8FRFRF4R4FRFRF4R4\n'
            + 'AAAAB-B-B-B-BBBBCCCCAA<FFL4CRCRF';
    }
}