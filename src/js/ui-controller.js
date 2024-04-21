const grid = document.querySelector('main');
// Live HTMLCollection
export const textareas = grid.children;
const allButtons = document.querySelectorAll('button');
const removeTextareaButton = document.querySelector('[data-control="remove"]');


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
    [...textareas].forEach((textArea) => (textArea.value = ''));
}

export function addNewTextarea() {
    const textarea = document.createElement('textarea');
    grid.appendChild(textarea);

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
