import { generateGameBoard, generateRandomCells, } from "./generateBoardFunctions.js";
import { applyRules } from "./applyRules.js";
import { checkNeighboard } from "./checkNeighbour.js";
const generateUserGameBoard = (rows, columns) => {
    const gameTable = document.querySelector(".container-table");
    for (let row = 1; row <= rows; row++) {
        gameTable.innerHTML += `<div class="row table-row-${row}"></div>`;
        const rowTable = document.querySelector(`.table-row-${row}`);
        for (let column = 1; column <= columns; column++) {
            rowTable.innerHTML += `<div class="col row-${row}-col-${column}"></div>`;
            const colPart = document.querySelector(`.row-${row}-col-${column}`);
            for (let button = 0; button < 1; button++) {
                colPart.innerHTML += `<button id="${row} "value="${column}" class="cell-button"></button>`;
            }
        }
    }
};
const placeCellOnBoard = (row, column, currentBoard) => {
    const cellToPlace = document.querySelector(`.row-${row}-col-${column}`);
    if (!currentBoard[row - 1][column - 1].alive) {
        currentBoard[row - 1][column - 1].alive = true;
        cellToPlace.classList.remove("dead");
        cellToPlace.classList.add("alive");
    }
    else if (currentBoard[row - 1][column - 1].alive) {
        currentBoard[row - 1][column - 1].alive = false;
        cellToPlace.classList.remove("alive");
        cellToPlace.classList.add("dead");
    }
};
const paintBoard = (currentBoard) => {
    for (let row = 0; row < currentBoard.length; row++) {
        for (let col = 0; col < currentBoard[row].length; col++) {
            const cell = currentBoard[row][col];
            if (!cell.alive) {
                const cellToPlace = document.querySelector(`.row-${row + 1}-col-${col + 1}`);
                cellToPlace.classList.remove("alive");
                cellToPlace.classList.add("dead");
            }
            else if (cell.alive) {
                const cellToPlace = document.querySelector(`.row-${row + 1}-col-${col + 1}`);
                cellToPlace.classList.remove("dead");
                cellToPlace.classList.add("alive");
            }
        }
    }
};
const registerEventListeners = (currentBoard) => {
    const cells = document.querySelectorAll(".cell-button");
    const resetButton = document.querySelector(".reset");
    const startButton = document.querySelector(".start");
    const randomButton = document.querySelector(".random");
    let gameRunning = false;
    let interval;
    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            const row = parseInt(cell.id);
            const column = parseInt(cell.value);
            placeCellOnBoard(row, column, currentBoard);
        });
    });
    randomButton?.addEventListener("click", () => {
        generateRandomCells(currentBoard);
        paintBoard(currentBoard);
    });
    startButton?.addEventListener("click", () => {
        if (!gameRunning) {
            gameRunning = true;
            startButton.textContent = "Pause";
            interval = setInterval(() => {
                const neighboardCount = checkNeighboard(currentBoard);
                applyRules(currentBoard, neighboardCount);
                paintBoard(currentBoard);
            }, 100);
        }
        else {
            gameRunning = false;
            startButton.textContent = "Start";
            clearInterval(interval);
        }
    });
    resetButton?.addEventListener("click", () => {
        currentBoard = generateGameBoard(60, 80);
        paintBoard(currentBoard);
        clearInterval(interval);
        startButton.textContent = "Start";
        gameRunning = false;
    });
};
const startProgram = () => {
    const rows = 60;
    const columns = 80;
    const currentBoard = generateGameBoard(rows, columns);
    generateUserGameBoard(rows, columns);
    registerEventListeners(currentBoard);
};
startProgram();