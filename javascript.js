let numRows = document.getElementById('grid-size');
let header = document.querySelector('h1');

let mouseDown = false;
document.body.onmousedown = () => { mouseDown = true };
document.body.onmouseup = () => { mouseDown = false };

const bigContainer = document.querySelector('.big-container');

function createGrid (numRows) {
    for (let i=0; i < numRows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        bigContainer.appendChild(row);
    
        for (let j=0; j < numRows; j++){
            const square = document.createElement('div');
            square.classList.add('square');
            row.appendChild(square);
        }
    }
}

createGrid(numRows.value)
initializeQuery()

numRows.addEventListener('change', (e) => {
    if (numRows.value > 100) {
        document.querySelector('#error').textContent = 'Error: max value of 100'
        return;
    }
    document.querySelector('#error').textContent = ''
    document.querySelectorAll('.square').forEach(sq => sq.remove())
    document.querySelectorAll('.row').forEach(row => row.remove())
    createGrid(numRows.value)
    initializeQuery()
});

function randomColor() {
        let result = '#';
        let characters = 'ABCDEF0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
}

let color = '#999999';

function initializeQuery() {
    const square = document.querySelectorAll('.square');
    square.forEach(sq => sq.addEventListener('mousedown', (e) => {
        e.preventDefault()
        if (color == 'random')
            e.target.style.backgroundColor = randomColor();
        else if (e.target.style.backgroundColor == '' || e.target.style.backgroundColor == 'white' || eraser.style.backgroundColor == 'lightblue')
                e.target.style.backgroundColor = color;
        else {
            let newColorNum = e.target.style.backgroundColor.split(',')[1] - 25
            e.target.style.backgroundColor = `rgb(${newColorNum},${newColorNum},${newColorNum}`;
        }
    }));

    square.forEach(sq => sq.addEventListener('mouseenter', animate));
}

function animate (e) {
    e.preventDefault()
    if (mouseDown)
            if (color == 'random')
                this.style.backgroundColor = randomColor();
            else if (e.target.style.backgroundColor == '' || e.target.style.backgroundColor == 'white' || eraser.style.backgroundColor == 'lightblue')
                e.target.style.backgroundColor = color;
            else {
                let newColorNum = e.target.style.backgroundColor.split(',')[1] - 25
                e.target.style.backgroundColor = `rgb(${newColorNum},${newColorNum},${newColorNum}`;
            }
}

let colorMode = document.querySelector('#color-mode')
let rainbowMode = document.querySelector('#rainbow-mode')
let eraser = document.querySelector('#eraser');
let clear = document.querySelector('#clear');
colorMode.style.backgroundColor = 'lightBlue';

colorMode.addEventListener('click', (e) => {
    e.target.style.backgroundColor = 'lightBlue';
    rainbowMode.style.backgroundColor = '#ededed';
    eraser.style.backgroundColor = '#ededed';
    header.innerHTML = `<span style = "color: black">Etch-a-Sketch</span>`
    color = '#999999';
})
rainbowMode.addEventListener('click', (e) => {
    e.target.style.backgroundColor = 'lightBlue';
    colorMode.style.backgroundColor = '#ededed';
    eraser.style.backgroundColor = '#ededed';
    rainbowHeader();
    color = 'random';
})
eraser.addEventListener('click', (e) => {
    e.target.style.backgroundColor = 'lightBlue';
    colorMode.style.backgroundColor = '#ededed';
    rainbowMode.style.backgroundColor = '#ededed';
    header.innerHTML = `<span style = "color: indianRed">Etch-a-Sketch</span>`
    color = 'white';
})
clear.addEventListener('click', (e) => {
    document.querySelectorAll('.square').forEach(sq => sq.style.backgroundColor = 'white');
})

function rainbowHeader (){
    let result = '';
    let headerLength = header.textContent.length;
    for (let i=0; i < headerLength; i++) {
        let letterColor = randomColor();
        let letter = header.textContent[i];
        result += `<span style = "color: ${letterColor}">${letter}</span>`;
    }
    header.innerHTML = result;
}