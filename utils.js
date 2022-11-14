function animateMatrix(matrixBefore, matrixAfter) {
    const changes = [];
    for (let i = 0; i < matrixBefore.length; i++) {
        for (let j = 0; j < matrixBefore[0].length; j++) {
            if (matrixBefore[i][j] != matrixAfter[i][j]) {
                changes.push([i, j]);
            }
        }
    }

    changes.forEach((change) => {
        const tableCords = matrixCordsToTableCords(change[0], change[1]);
        const changedElement = document.getElementById('main-table').children[tableCords[0]].children[tableCords[1]];
        changedElement.children[0].style.transform = 'scale(1.35)';
        
    });

    if (matrix != matrixAfter) {
        addToHistory(matrixAfter);
    }

    matrix = matrixAfter;
    
    updateMainTable();

    changes.forEach((change) => {
        const tableCords = matrixCordsToTableCords(change[0], change[1]);
        const changedElement = document.getElementById('main-table').children[tableCords[0]].children[tableCords[1]];
        
        before = matrixBefore[change[0]][change[1]];
        after = matrixAfter[change[0]][change[1]];

        if (after > before) {
            changedElement.children[0].style.color = 'green';
        }else if (after < before) {
            changedElement.children[0].style.color = 'red';
        }
    });

    setTimeout(() => {

        changes.forEach((change) => {
            const tableCords = matrixCordsToTableCords(change[0], change[1]);
            const changedElement = document.getElementById('main-table').children[tableCords[0]].children[tableCords[1]];
            changedElement.children[0].style.transform = 'scale(1.0)';
            changedElement.children[0].style.color = 'black';
        });
}, 250);


}

function matrixCordsToTableCords(row, col) {
    return [row+1, col+1];
}