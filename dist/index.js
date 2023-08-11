"use strict";
const grid = document.getElementById("grid");
const colorInput = document.getElementById("colorInput");
const colors = ["red", "blue", "yellow", "green"];
const amountRows = 20;
const amountColumns = 20;
const mtx = Array.from({ length: amountRows }, ee => Array.from({ length: amountColumns }, vv => colors[Math.floor(Math.random() * colors.length)]));
function BFS(mtx, row, column) {
    const visit = Array.from({ length: amountRows }, ee => Array.from({ length: amountColumns }, vv => false));
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];
    const preserv = mtx[row][column];
    const q = [];
    q.push([row, column]);
    visit[row][column] = true;
    mtx[row][column] = colorInput.value;
    while (q.length !== 0) {
        const [xCord, yCord] = q.shift();
        for (let k = 0; k < directions.length; k++) {
            const [xDirection, yDirection] = directions[k];
            const xRef = xCord + xDirection;
            const yRef = yCord + yDirection;
            if (xRef >= 0 &&
                xRef < amountRows &&
                yRef >= 0 &&
                yRef < amountColumns &&
                !visit[xRef][yRef] &&
                mtx[xRef][yRef] === preserv) {
                q.push([xRef, yRef]);
                visit[xRef][yRef] = true;
                mtx[xRef][yRef] = colorInput.value;
            }
        }
    }
    paint();
}
function paint() {
    grid.style.gridTemplateColumns = `repeat(${amountColumns}, 1fr)`;
    grid.innerHTML = "";
    for (let i = 0; i < mtx.length; i++) {
        for (let j = 0; j < mtx[0].length; j++) {
            const square = document.createElement("article");
            square.classList.add("square");
            square.style.backgroundColor = mtx[i][j];
            square.dataset.row = String(i);
            square.dataset.column = String(j);
            grid.appendChild(square);
            square.addEventListener("click", evt => {
                const { row, column } = evt.target.dataset;
                BFS(mtx, Number.parseInt(row), Number.parseInt(column));
            });
        }
    }
}
function init() {
    paint();
}
init();
