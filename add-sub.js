bars.forEach(bar => {
    bar.addEventListener('dragend', e => addSubDragEnd(e));

    bar.addEventListener('dragstart', e => {
        bar.classList.add('dragging');
    });
    bar.addEventListener('drag', e => addSubDrag(e));
});

function addSubDrag(e) {

}

function addSubDragEnd(e) {
    const sign = getOperatorSign(e);

    if (sign == null) {
        return;
    }

    const draggedRow = document.querySelector('.dragging').parentElement.parentElement;
    document.querySelectorAll('.dragging').forEach(dragging => dragging.classList.remove('dragging'));
    const draggedY = Array.from(draggedRow.parentElement.children).indexOf(draggedRow) - 1;
    const signRow = sign.parentElement.parentElement;
    const signY = Array.from(signRow.parentElement.children).indexOf(signRow) - 1;

    if (signY == draggedY) {
        return;
    }

    console.log(draggedY, signY);

    var clone = matrix.map(function(arr) {
        return arr.slice();
    });

    if (sign.classList.contains('positive')) {
        clone[draggedY] = math.add(clone[draggedY], clone[signY]);
        document.getElementById('last-operation').innerHTML = `Last Operation: ${integerToRomanNumber(draggedY+1)}' = ${integerToRomanNumber(draggedY+1)} + ${integerToRomanNumber(signY+1)}`;
    }else {
        clone[draggedY] = math.subtract(clone[draggedY], clone[signY]);
        print(`${integerToRomanNumber(draggedY+1)}' = ${integerToRomanNumber(draggedY+1)} - ${integerToRomanNumber(signY+1)}`);
        document.getElementById('last-operation').innerHTML = `Last Operation: ${integerToRomanNumber(draggedY+1)}' = ${integerToRomanNumber(draggedY+1)} - ${integerToRomanNumber(signY+1)}`;
    }

    animateMatrix(matrix, clone);
    party.confetti(row);
    
}

function getOperatorSign(e) {
    const dragX = e.pageX, dragY = e.pageY;
    const sign = document.elementFromPoint(dragX, dragY);

    if (sign && sign.classList.contains('operator-sign')) {
        return sign;
    }else {
        return null;
    }
}