const numMines = 2

function makeGrid() {
    var grid = new Array(4);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(4);
    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j] = 2;
        }
    }
    return grid;
}