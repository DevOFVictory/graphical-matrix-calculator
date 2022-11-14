multipliers = document.querySelectorAll('.multiplier');
multipliers.forEach(multiplier => {
    
    multiplier.addEventListener('dragstart', e => {
        multiplier.classList.add('dragging');
    });
    multiplier.addEventListener('drag', e => {
        drag(e);
    });
    // multiplier.addEventListener('mouseup', e => dragend(e));
    multiplier.addEventListener('dragend', e => dragend(e));

    
});

const customMultiplier = document.querySelector('#custom-multiplier');
const customMultiplierInput = document.querySelector('input');
customMultiplierInput.addEventListener('input', () => {
    customMultiplier.innerHTML = 'x ' + customMultiplierInput.value;
});

function drag(e) {
    
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

function dragend(e) {
    
    const multiplier = document.querySelector('.dragging');

    document.querySelectorAll('.dragging').forEach(dragging => dragging.classList.remove('dragging'));
    // parse string to int
    const multiplierValue = math.evaluate(multiplier.children[0].innerHTML.split(' ')[1] + '*'+ customSignFactor);

    const selectedItem = document.querySelector('.selected');

    const isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

    const row = isSafari ? (selectedItem ? selectedItem.parentElement : null) : getHoveredRow(e);

    if (row) {

        const y = Array.from(row.parentElement.children).indexOf(row) - 1;

        var clone = matrix.map(function(arr) {
            return arr.slice();
        });

        clone[y] = math.multiply(matrix[y], multiplierValue);
        print(`${integerToRomanNumber(y+1)}' = ${multiplierValue} * ${integerToRomanNumber(y+1)}`);
        document.getElementById('last-operation').innerHTML = `Last Operation: ${integerToRomanNumber(y+1)}' = ${multiplierValue} * ${integerToRomanNumber(y+1)}`;

        animateMatrix(matrix, clone);
        party.confetti(row);

        
    }


    
}

function getHoveredRow(e) {


    const dragX = e.pageX, dragY = e.pageY;
    const elements = document.elementFromPoint(dragX, dragY);
    
    const td = elements.tagName == 'P' || elements.tagName == 'I' ? elements.parentElement : elements;

    return td && (td.tagName == 'TD' || td.tagName == 'TH') && td.parentElement.parentElement.id == 'main-table' ? td.parentElement : null;
}

function getMatrixElements(row) {
    return Array.from(row.children).filter(td => td.classList.contains('matrix-part'))
}


