let numRows = document.getElementById('grid-size');

let mouseDown = false;
window.onmousedown = () => {
    console.log('mouse down')
  mouseDown = true
}
window.onmouseup = () => {
  mouseDown = false;
}

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

numRows.addEventListener('change', () => {
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

let color = 'black';

function initializeQuery() {
    const square = document.querySelectorAll('.square');
    square.forEach(sq => sq.addEventListener('mousedown', (e) => {
        if (color == 'random')
            e.target.style.backgroundColor = randomColor();
        else
            e.target.style.backgroundColor = color;
    }));
    square.forEach(sq => sq.addEventListener('mouseenter', animate));
}

function animate (e) {
    if (mouseDown)
        if (color == 'random')
            this.style.backgroundColor = randomColor();
        else
            this.style.backgroundColor = color;

}

let colorMode = document.querySelector('#color-mode')
let rainbowMode = document.querySelector('#rainbow-mode')
let eraser = document.querySelector('#eraser');
let clear = document.querySelector('#clear');
colorMode.style.backgroundColor = 'lightBlue';

colorMode.addEventListener('click', (e) => {
    e.target.style.backgroundColor = 'lightBlue'
    rainbowMode.style.backgroundColor = '#ededed'
    eraser.style.backgroundColor = '#ededed'
    color = 'black'
})
rainbowMode.addEventListener('click', (e) => {
    e.target.style.backgroundColor = 'lightBlue'
    colorMode.style.backgroundColor = '#ededed'
    eraser.style.backgroundColor = '#ededed'
    bigContainer.focus()
    color = 'random'
})
eraser.addEventListener('click', (e) => {
    e.target.style.backgroundColor = 'lightBlue'
    colorMode.style.backgroundColor = '#ededed'
    rainbowMode.style.backgroundColor = '#ededed'
    bigContainer.focus()
    color = 'white'
})
clear.addEventListener('click', (e) => {
    document.querySelectorAll('.square').forEach(sq => sq.style.backgroundColor = 'white')
    bigContainer.focus()
})

