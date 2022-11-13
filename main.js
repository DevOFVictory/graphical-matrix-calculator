var matrix = [[ 1, 2, 3, 4,5],
              [ 5, 6, 7, 8, 1],
              [ 9,10,11,12, 1],
              [13,14,15,16, 1]];

renderMainTable();

function renderMainTable() {
    const rows = matrix.length + 1;
    const cols = matrix[0].length + 3;

    const mainTable = document.querySelector('#main-table');

    mainTable.innerHTML = '';

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    for (let row = 0; row < rows; row++) {
        var rowEle = null;
        rowEle = document.createElement('tr');


        for (let col = 0; col < cols; col++) {
            var colEle = null;
            if (col==0 || row==0 || col==matrix[0].length+2) {
                colEle = document.createElement('th');
            }else {
                colEle = document.createElement('td');
            }

            colEle.innerHTML = '<p>' + 'E' + '</p>';


            if (row >= 1 && col >= 1 && col <= matrix[0].length) {

                // if (row-1 + (matrix.length-row) == matrix.length -1 && col-1 < matrix[0].length - 2 - (matrix.length-row)) {
                //     colEle.style.backgroundColor = 'rgba(245, 245, 39, 0.43)';
                // }

                console.log(row, col);
                if (row == col) {
                    colEle.style.backgroundColor = 'rgba(232, 142, 17, 0.3)';
                }else if (row != col && col < matrix[0].length) {
                    colEle.style.backgroundColor = 'rgba(232, 227, 17, 0.3)';
                }else if (col == matrix[0].length) {
                    colEle.style.backgroundColor = 'rgba(17, 232, 218, 0.3)';
                }


                if (Number.isInteger(matrix[row-1][col-1])) {
                    colEle.innerHTML = '<p>' + matrix[row-1][col-1] + '</p>';
                }else {
                    colEle.innerHTML = '<p>' + matrix[row-1][col-1].toFixed(2) + '</p>';
                }
                colEle.classList.add('matrix-part');
            }

            if (row == 0 && col == 0) {
                colEle.innerHTML = '<i id="help-btn" class="fa-solid fa-circle-question orange clickable"></i>';
            }

            if (col == 0 && row >= 1) {
                colEle.innerHTML = '<p class="roman">' + (integerToRomanNumber(row)) + '</p>';
            }

            if (row == 0 && col >= 1 && col < matrix[0].length) {
                colEle.innerHTML = '<p>' + alphabet.charAt(col-1) + '</p>';
            }

            if (row == 0 && col == matrix[0].length) {
                colEle.innerHTML = '<p>' + '=' + '</p>';
            }

            if (row == 0 && col == matrix[0].length + 1) {
                colEle.innerHTML = `<div>
                <i class="fa-solid fa-arrow-rotate-left disabled clickable smaller" id="undo-btn"></i>
                <i class="fa-regular fa-clock clickable" id="history-btn"></i>
                <i class="fa-solid fa-arrow-rotate-right disabled clickable smaller" id="redo-btn"></i>
            </div>`;
            }

            if (row == 0 && col == matrix[0].length + 2) {
                colEle.innerHTML = '<i id="info-btn" class="fa-solid fa-circle-info orange clickable"></i>';
            }

            if (col == matrix[0].length + 1 && row >= 1) {
                colEle.innerHTML = '<i class="fa-solid fa-bars clickable"></i>';
            }

            if (col == matrix[0].length + 2 && row >= 1) {
                colEle.innerHTML = '<i class="fa-solid fa-circle-minus red"></i>';
            }

            if (row >= 1 && col == matrix[0].length + 1) {
                colEle.classList.add('last');
            }

            if (row >= 1 && col == 1) {
                colEle.classList.add('first');
            }

            

            colEle.align = 'center';
            rowEle.appendChild(colEle);

            
        }
        mainTable.appendChild(rowEle);
    }
}

function updateMainTable() {
    const tds = document.querySelectorAll('.matrix-part');
    tds.forEach((td, index) => {

        const x = index%matrix[0].length;
        const y = Math.floor(index/matrix[0].length);
        
        if (Number.isInteger(matrix[y][x])) {
            td.children[0].innerHTML = matrix[y][x];
        }else {
            if ((''+matrix[y][x]).split('.')[1].length > 2) {
                td.children[0].innerHTML = '~' + matrix[y][x].toFixed(2);
            }else {
                td.children[0].innerHTML = matrix[y][x].toFixed(2);
            }
        }
    });
}

function integerToRomanNumber(number) {
    var romanNumber = '';
    var romanNumbers = {
        1: 'I',
        4: 'IV',
        5: 'V',
        9: 'IX',
        10: 'X',
        40: 'XL',
        50: 'L',
        90: 'XC',
        100: 'C',
        400: 'CD',
        500: 'D',
        900: 'CM',
        1000: 'M'
    };
    var romanNumbersKeys = Object.keys(romanNumbers).reverse();
    var numberCopy = number;
    while (numberCopy > 0) {
        for (let i = 0; i < romanNumbersKeys.length; i++) {
            if (numberCopy >= romanNumbersKeys[i]) {
                romanNumber += romanNumbers[romanNumbersKeys[i]];
                numberCopy -= romanNumbersKeys[i];
                break;
            }
        }
    }
    return romanNumber;
}
