const numMines = 2;

function makeGrid() {
    var grid = new Array(4);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(4);
    }
}

function calculateCells() {
    assignMines();
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
                    if (!(adjacentCol < 0 || adjacentCol > num_cols-1)) {
                        if (grid[adjacentRow][adjacentCol] == -1) {
                            sum++;
                        }
                    } 
                }
            }
            grid[r][c] = sum;
        }
    }
}