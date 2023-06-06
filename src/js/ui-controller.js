export class UI {
    static textAreas = document.querySelector('.grid').children;
    static allBtns = document.querySelectorAll('button');

    static clearAllTextAreas() {
        [...UI.textAreas].forEach(textArea => textArea.value = '');
    }

    static addNewTextArea() {
        const grid = document.querySelector('.grid');
        const textArea = document.createElement('textarea');
        grid.appendChild(textArea);

        if (grid.childElementCount > 1) {
            document.querySelector('#remove-textarea').disabled = false;
        }
    }

    static removeLastTextArea() {
        const grid = document.querySelector('.grid');
        grid.removeChild(grid.lastChild);

        if (grid.childElementCount < 2) {
            document.querySelector('#remove-textarea').disabled = true;
        }
    }

    static disableBtnsWhenPlaying() {
        this.allBtns.forEach(btn => {
            btn.disabled = btn.id !== 'stop' ? true : false;
        });
    }

    static enableBtnsExceptStop() {
        this.allBtns.forEach(btn => {
            btn.disabled = btn.id !== 'stop' ? false : true;
        });
    }
}