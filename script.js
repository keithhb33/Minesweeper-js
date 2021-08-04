var grid = [];
var bombGrid = [];
var numBombs = 2;
var bombArray = [];

function makeGrid(){
    for (let row = 0; row < document.getElementsByClassName("row").length; row++) {
        let rowElement = document.getElementsByClassName("row")[row];
        let rowArray = [];
        let bombRow = [];
        for (let col = 0; col < rowElement.getElementsByClassName("col-3").length; col++) {
            let cell = rowElement.getElementsByClassName("col-3")[col].getElementsByClassName("cell")[0];
            cell.rowIndex = row;
            cell.colIndex = col;
            rowArray.push(cell);
            bombRow.push(cell);
        }
        grid.push(rowArray);
        bombGrid.push(bombRow);
    }


    addRemoveFlags();
    

    //Randomize mines on board
    assignMines();
    console.log(grid);
}

function addRemoveFlags(){
    $(".container").contextmenu(function(event){
        var flaggedSquare = event.target;
        if(flaggedSquare.src.includes("images/unclicked.png")){
            flaggedSquare.src = "images/flag.png";
        }else if(flaggedSquare.src.includes("images/flag.png")){
            flaggedSquare.src = "images/unclicked.png";
        }
    });
}


$(".cell").on("click", function(){

    //Hide "click any cell to start" message
    document.getElementById("play-message").style.opacity = "0%";

    if(bombArray.some(cell => cell === this)){
        this.getElementsByTagName("img")[0].setAttribute("src", "images/bomb.png");
    } else {
        this.getElementsByTagName("img")[0].setAttribute("src", "images/clicked.png");
    }
});


function winGame(grid){
    //Displays bombs in grid
    displayAllBombs(grid);

    //Send win message
    endMessage = document.getElementById("end-message");
    endMessage.textContent = "YOU WIN!";
}

function loseGame(grid){
    //Display all bombs in grid
    displayAllBombs(grid);

    //Send lose message
    endMessage = document.getElementById("end-message");
    endMessage.textContent = "YOU LOSE!";
}


function displayAllBombs(grid){
    //Makes all bombs visible in grid
    for(var i=0; i<grid.length; i++){
        for(var j=0; j<grid.length; j++){
            grid[i][j].src ="";
            if(grid[i][j].alt == "bomb"){
                grid[i][j].src = "images/bomb.png";
            }
        }
    }
}


function assignMines(){
    for (let i = 0; i < numBombs; i++) {
        var randomRow = bombGrid[Math.floor(Math.random() * bombGrid.length)];
        var randomCellIndex = Math.floor(Math.random() * randomRow.length);
        bombArray.push(randomRow.splice(randomCellIndex, 1)[0]);
    }
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
}
makeGrid();


