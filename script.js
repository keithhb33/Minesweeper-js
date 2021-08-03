var randomRow = (Math.floor(Math.random() * 4) + 1);
var randomCol = (Math.floor(Math.random() * 4) + 1);
const numMines = 2;

function makeGrid(){
    var grid = new Array(4);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(4);
    }
    assignMines(grid);
}

function assignMines(grid){
    //Finds random bomb location in grid
    //Bomb values in 2D array are 1 to be accessed later
    mine1Col = (Math.floor(Math.random() * 4) + 1);
    mine2Col = (Math.floor(Math.random() * 4) + 1);

    mine1Row = (Math.floor(Math.random() * 4) + 1);
    mine2Row = (Math.floor(Math.random() * 4) + 1);

    grid[mine1Col][mine1Row] = 1;
    grid[mine2Col][mine2Row] = 1;

    calculateCells(grid);
}

function calculateCells(grid){
    let displacements = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];
    let numRows = grid.length;
    let numCols = grid[0].length;
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            let sum = 0;
            for (let i = 0; i < 8; i++) //8 possible displacements 
            {
                let adjacentRow = r + displacements[i][0];
                let adjacentCol = c + displacements[i][1];
                if (!(adjacentRow < 0 || adjacentCol > numRows-1)) {
                    if (!(adjacentCol < 0 || adjacentCol > numCols-1)) {
                        if (grid[adjacentRow][adjacentCol] == -1) {
                            sum++;
                        }
                    } 
                }
            }
            grid[r][c] = sum;
        }
    }
checkWinLose(grid);
}

function checkWinLose(grid){

}




