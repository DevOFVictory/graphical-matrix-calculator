multipliers = document.querySelectorAll('.multiplier');
multipliers.forEach(multiplier => {
    
    multiplier.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('application/node type', this);
        console.log(e);
        multiplier.classList.add('dragging');
    });
    multiplier.addEventListener('drag', e => drag(e));
    multiplier.addEventListener('dragend', e => dragend(e));
});

const customMultiplier = document.querySelector('#custom-multiplier');
const customMultiplierInput = document.querySelector('input');
customMultiplierInput.addEventListener('input', () => {
    customMultiplier.innerHTML = 'x ' + customMultiplierInput.value;
});

function drag(e) {
    const multiplier = document.querySelector('.dragging');
    
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
    e.preventDefault();
    const multiplier = document.querySelector('.dragging');
    // parse string to int
    const multiplierValue = math.evaluate(multiplier.children[0].innerHTML.split(' ')[1] + '*'+ customSignFactor);
    const row = getHoveredRow(e);
    if (row) {

        const befores = {};

        getMatrixElements(row).forEach((td, index) => {
            td.children[0].style.transform = 'scale(1.35)';
            befores[index] = Number(td.children[0].innerHTML.replace('~', ''));
        });

        const y = Array.from(row.parentElement.children).indexOf(row) - 1;
            
        for (let x = 0; x < matrix[y].length; x++) {
            console.log(matrix[y][x] + ' * ' + multiplierValue + ' = ' + matrix[y][x] * multiplierValue);
            matrix[y][x] *=  multiplierValue;
        }

        updateMainTable();

        getMatrixElements(row).forEach((td, index) => {
            const after = Number(td.children[0].innerHTML.replace('~', ''));
            if (after > befores[index]) {
                td.children[0].style.color = 'green';
            }else if (after < befores[index]) {
                td.children[0].style.color = 'red';
            }
        });


        setTimeout(() => {

            getMatrixElements(row).forEach((td, index) => {
                td.children[0].style.transform = 'scale(1.0)';
                td.children[0].style.color = 'black';


            });
    }, 250);

        
    }
    multiplier.classList.remove('dragging');
}

function getHoveredRow(e) {
    const dragX = e.pageX, dragY = e.pageY;
    const elements = document.elementFromPoint(dragX, dragY);
    
    const td = elements.tagName == 'P' || elements.tagName == 'I' ? elements.parentElement : elements;

    return td && td.tagName == 'TD' && td.parentElement.parentElement.id == 'main-table' ? td.parentElement : null;
}

function getMatrixElements(row) {
    return Array.from(row.children).filter(td => td.classList.contains('matrix-part'))
}

