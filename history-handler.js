const history = [];
var pointer = 0;



// add matrix to history

const undoButton = document.getElementById('undo-btn');
const redoButton = document.getElementById('redo-btn');
undoButton.addEventListener('click', undo);
redoButton.addEventListener('click', redo);

addToHistory(matrix);


function addToHistory(matrix) {
    // clone matrix
    var clone = matrix.map(function(arr) {
        return arr.slice();
    });
    history.push(clone);
    pointer = history.length - 1;

    updateButtonStates();
}

function undo() {
    if (pointer > 0) {
        pointer--;
        matrix = history[pointer];
        updateMainTable();
        updateButtonStates();
    }
}

function redo() {
    if (pointer < history.length - 1) {
        pointer++;
        matrix = history[pointer];
        updateMainTable();
        updateButtonStates();
    }
}

function updateButtonStates() {
    if (pointer == 0) {
        undoButton.classList.add('disabled');
    }else {
        undoButton.classList.remove('disabled');
    }

    if (pointer == history.length - 1) {
        redoButton.classList.add('disabled');
    }else {
        redoButton.classList.remove('disabled');
    }
}