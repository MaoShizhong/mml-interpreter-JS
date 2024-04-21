const grid = document.querySelector('.grid');
// Live HTMLCollection
export const textareas = grid.children;
const allButtons = document.querySelectorAll('button');

export function clearAllTextAreas() {
    [...textareas].forEach((textArea) => (textArea.value = ''));
}

export function addNewTextArea() {
    const textArea = document.createElement('textarea');
    grid.appendChild(textArea);

    if (grid.childElementCount > 1) {
        document.querySelector('#remove-textarea').disabled = false;
    }
}

export function removeLastTextArea() {
    const grid = document.querySelector('.grid');
    grid.removeChild(grid.lastChild);

    if (grid.childElementCount < 2) {
        document.querySelector('#remove-textarea').disabled = true;
    }
}

export function generateNewTextareas(count) {
    grid.replaceChildren();
    for (let i = 0; i < count; i++) {
        addNewTextArea();
    }

    return [...textareas];
}

export function disableButtonsExceptStop() {
    allButtons.forEach((btn) => {
        btn.disabled = btn.id !== 'stop';
    });
}

export function enableButtonsExceptStop() {
    allButtons.forEach((btn) => {
        btn.disabled = btn.id === 'stop';
    });
}
