const bars = document.querySelectorAll('.fa-bars');
bars.forEach(bar => {
    bar.addEventListener('dragend', e => swapDragEnd(e));

    bar.addEventListener('dragstart', e => {
        bar.classList.add('dragging');
    });
    bar.addEventListener('drag', e => swapDrag(e));
});


function swapDragEnd(e) {
    if (getOperatorSign(e) != null) {
        return;
    }

    const draggedRow = document.querySelector('.dragging').parentElement.parentElement;
    document.querySelectorAll('.dragging').forEach(dragging => dragging.classList.remove('dragging'));



    const y = Array.from(draggedRow.parentElement.children).indexOf(draggedRow) - 1;

    const row = getHoveredRow(e);


    if (row) {
        
        const y2 = Array.from(row.parentElement.children).indexOf(row) - 1;

        if (y == y2) {
            return;
        }
        party.confetti(row);

        var clone = matrix.map(function(arr) {
            return arr.slice();
        });

        [clone[y], clone[y2]] = [clone[y2], clone[y]];
        print(`${integerToRomanNumber(y+1)}' = ${integerToRomanNumber(y2+1)}; ${integerToRomanNumber(y2+1)}' = ${integerToRomanNumber(y+1)}`);
        document.getElementById('last-operation').innerHTML = `Last Operation: ${integerToRomanNumber(y+1)}' = ${integerToRomanNumber(y2+1)}; ${integerToRomanNumber(y2+1)}' = ${integerToRomanNumber(y+1)}`;

        animateMatrix(matrix, clone);
        
    }

}

function swapDrag(e) {
    
    const row = getHoveredRow(e);
    

    if (row) {
        const hoveredRowElements = getMatrixElements(row);

        
        document.querySelectorAll('.matrix-part').forEach(td => {
            if (hoveredRowElements.includes(td)) {
                td.classList.add('selected');
            } else {
                td.classList.remove('selected');
                
            }
        });

    }else {
        document.querySelectorAll('.matrix-part').forEach(td => td.classList.remove('selected'));
    }
    
    
}