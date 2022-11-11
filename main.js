var matrix = [[2,2,2,8],[2,2,2,8],[2,2,2,8]];

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
                colEle.innerHTML = '<p>' +  matrix[row-1][col-1] + '</p>';
            }

            if (row == 0 && col == 0) {
                colEle.innerHTML = '<i class="fa-solid fa-circle-question orange"></i>';
            }

            if (col == 0 && row >= 1) {
                colEle.innerHTML = '<p>' + (row) + '</p>';
            }

            if (row == 0 && col >= 1 && col < matrix[0].length) {
                colEle.innerHTML = '<p>' + alphabet.charAt(col-1) + '</p>';
            }

            if (row == 0 && col == matrix[0].length) {
                colEle.innerHTML = '<p>' + '=' + '</p>';
            }

            if (row == 0 && col == matrix[0].length + 1) {
                colEle.innerHTML = `<div>
                <i class="fa-solid fa-arrow-rotate-left" id="undo-btn"></i>
                <i class="fa-regular fa-clock"></i>
                <i class="fa-solid fa-arrow-rotate-right" id="redo-btn"></i>
            </div>`;
            }

            if (row == 0 && col == matrix[0].length + 2) {
                colEle.innerHTML = '<i class="fa-solid fa-circle-info orange"></i>';
            }

            if (col == matrix[0].length + 1 && row >= 1) {
                colEle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }

            if (col == matrix[0].length + 2 && row >= 1) {
                colEle.innerHTML = '<i class="fa-solid fa-circle-minus red"></i>';
            }

            


            colEle.align = 'center';
            rowEle.appendChild(colEle);
            
        }
        mainTable.appendChild(rowEle);
    }
}
