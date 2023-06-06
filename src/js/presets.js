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

    static loadPresetShost() {
        Presets.setNumberOfTextAreas(7);
        UI.textAreas[0].value =
            'T192L2\nRRRRRRL8\nB-4.CD-4.CB-4CD-E-4B-RR2\nD-4.B-CB-CD-E-4B-R\nE4D-E-L4ED-FB-8R4.\n'
            + 'D-8E-8ED-FE8F8L16\nG-RFG->A-R<G->A-ARB-RCRD-RE-RB-RE-RB-R<\nG-RFG->A-R<G->A-ARB-RCRD-R\n'
            + 'E-RDE-ERE-EFRCRG-4.FE-D-RB-RFRCRG-4.FG->A-R<G->A-ARA-A\nL8B-R4.B-';
        UI.textAreas[1].value =
            'T192L2\nRRRRRRRRRRR\nRRRRRRRRRRRRL16<\nG-RFG->A-R<G->A-ARB-RCRD-R'
            + 'E-RDE-ERE-EFRCRG-4.FE-D-RB-RFRCRG-4.FG->A-R<G->A-ARA-A\nL8B-R4.B-';
        UI.textAreas[2].value =
            'T192L8O3\nD-R4.D-R8R2D-E-ERD-E-ERD-R4.D-R4.D-R4.D-R4.D-R4.D-E-ERD-E-ERD-R4.D-R4.D-E-ERD-R4.\n'
            + 'D-R4.D-E-ERD-R4.D-R4.D-R\nRE-RE-RD-RD-RE-RE-RD-RE-RERE\nRD-RG-RFRL16EEL8EFRFRFRL16FFL8FFRFRE-D-R4.D-';
        UI.textAreas[3].value =
            'T192L8O3\nB-R4.B-R8R2B-CD-RB-CD-RB-R4.B-R4.B-R4.B-R4.B-R4.B-CD-RB-CD-RB-R4.B-R4.B-CD-RB-R4.\n'
            + 'B-R4.B-CD-RB-R4.B-R4.B-R\nRB-RB-RB-RB-RB-RB-RB-RCRD-RD-\nRB-RCRCRL16CCL8CCRB-RCRL16CCL8CCRB-RB-B-R4.B-';
        UI.textAreas[4].value =
            'T192L8O2\n\nFR4.FRR2FG>AR<FG>AR<FR4.FR4.FR4.FR4.FR4.FG>AR<FG>AR<FR4.FR4.FG>AR<FR4.FR4.FG>AR<FR4.FR4.FR\n'
            + 'RG-RG-RFRG-RGRGRG->RA-RARA<\nRG-RG-RFRL16G-G-L8G-G-RFRFRL16G-G-L8G-G-RG-RG-FR4.F';
        UI.textAreas[5].value =
            'T192L8O2\nB-R4.B-RR2B-R4.B-R4.B-R4.B-R4.B-R4.B-R4.B-R4.B-R4.B-R4.B-R4.B-R4.B-R4.B-R4.B-R4.\n'
            + 'B-R4.B-R4.B-R4.B-RRB-RB-RB-RB-RB-RB-RB-RB-RARA\nRB-RB-RARL16B-B-L8B-ARB-RARL16AAL8AARB-RCB-R4.B-';
        UI.textAreas[6].value =
            'T192L8O1\nD-R4.D-RR2D-R4.D-R4.D-R4.D-R4.D-R4.D-R4.D-R4.D-R4.D-R4.D-R4.D-R4.D-R4.D-R4.D-R4.D-R4.D-R4.\n'
            + 'D-R4.D-RRD-RD-RD-RD-RD-RD-RD-RD-RD-RD-\nRD-RD-RD-RL16D-D-L8D-D-RD-RD-RL16D-D-L8D-D-RD-RD-D-R4.D-';
    }
}