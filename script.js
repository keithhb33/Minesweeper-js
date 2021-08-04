window.onload = function() {


function makeGrid(){
    //Create 2d array
    var grid = new Array(4);
    for (let row = 0; row < 4; row++){
        for (let column = 0; column < 4; column++){
            grid[row] = new Array(4);
        }
    }

    //Set all squares icons to minesweeper icon png
    for(var i=0; i<grid.length; i++){
        for(var j=0; j<grid.length; j++){
            grid[i][j] = document.getElementById("at-" + i.toString() + "-" + j.toString());
            grid[i][j].src ="images/unclicked.png";
        }
    }

    addRemoveFlags();
    
    //Click on square event
    onSquareClick(grid);


    //Randomize mines on board
    assignMines(grid);
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

function onSquareClick(grid){
    var clickCounter = 0;
        $(".container").on("click", function(event){

            //Hide "click any cell to start" message
            document.getElementById("play-message").style.opacity = "0%";

            //Get clicked square element
            var clickedSquare = event.target;

            if(clickedSquare.src.includes("images/unclicked.png") || clickedSquare.src.includes("images/flag.png")){
                clickedSquare.src = "";
                clickCounter++;
                console.log(clickCounter);
            }
            
            //Lose game event
            if(clickedSquare.alt == "bomb"){
                clickedSquare.src = "images/bomb.png";
                loseGame(grid);
            }
            //Win game event
            else if(clickCounter == grid.length**2-2){
                winGame(grid);
            }
        })
}

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

function assignMines(grid){
    //Finds random bomb location in grid
    mine1Col = (Math.floor(Math.random() * 4));
    mine2Col = (Math.floor(Math.random() * 4));

    mine1Row = (Math.floor(Math.random() * 4));
    mine2Row = (Math.floor(Math.random() * 4));

    //Makes sure that the two bombs can't be placed in the same spot
    if(grid[mine1Col][mine1Row].id == grid[mine2Col][mine2Row].id){
        mine1Col = (Math.floor(Math.random() * 4));
        mine2Col = (Math.floor(Math.random() * 4));

        mine1Row = (Math.floor(Math.random() * 4));
        mine2Row = (Math.floor(Math.random() * 4));
    }if(mine1Col == mine2Col && mine1Row == mine2Row){
        checkIfMinesSamePlace(mine1Col, mine1Row, mine2Col, mine2Row);
    }

    //Creates mines
    grid[mine1Col][mine1Row] = document.getElementById("at-" + mine1Col.toString() + "-" + mine1Row.toString());
    grid[mine2Col][mine2Row] = document.getElementById("at-" + mine2Col.toString() + "-" + mine2Row.toString());
    
    grid[mine1Col][mine1Row].alt = "bomb";
    grid[mine2Col][mine2Row].alt = "bomb";

    //Sets bombs to stay behind button images
    grid[mine1Col][mine1Row].style.zIndex = "-1";
    grid[mine2Col][mine2Row].style.zIndex = "-1";

    grid[mine1Col][mine1Row].style.left = "50%;"
    grid[mine2Col][mine2Row].style.top = "50px;"

    console.log("Mine 1: " + grid[mine1Col][mine1Row].id);
    console.log("Mine 2: " + grid[mine2Col][mine2Row].id);
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

}

