var grid = [];
var bombGrid = [];
var numBombs = 0;
var bombArray = [];
var mins = 0;
var sec = 0;
var stoptime = true;
var clickCounter = 0;

function makeGrid(){
    for (let row = 0; row < document.getElementsByClassName("row").length; row++) {
        let rowElement = document.getElementsByClassName("row")[row];
        let rowArray = [];
        let bombRow = [];
        for (let col = 0; col < rowElement.getElementsByClassName("col").length; col++) {
            let cell = rowElement.getElementsByClassName("col")[col].getElementsByClassName("cell")[0];
            cell.rowIndex = row;
            cell.colIndex = col;
            cell.addEventListener("click", userClick, false);
            rowArray.push(cell);
            bombRow.push(cell);
        }
        grid.push(rowArray);
        bombGrid.push(bombRow);
        stopwatch();
    }
    numBombs = grid.length - 1;

    //addRemoveFlags();
    addRemoveFlags();

    //Randomize mines on board
    assignMines();
    console.log(grid);
}

function onclicktimer() {
    stoptime = false;
}

function stopwatch() {
    const timer = document.getElementById("stopwatch");
    var col = document.getElementsByClassName("cell")
    if(sec < 10) {
        timer.innerHTML = mins + ':' + '0' + sec;
    }
    else {
        timer.innerHTML = mins + ':' + sec;
    }
    for (var i = 0; i < col.length; i++) {
        col[i].addEventListener('click', onclicktimer);
    }
    //alert("did you start")
    if(stoptime == false) {
        sec = parseInt(sec);
        mins = parseInt(mins);
        sec++;
    }

    if (sec == 60) {
        mins++;
        sec = 0;
    }

    if(stoptime == true) {
        sec = sec;
        mins = mins;
    }
    
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


function userClick() {
    //Remove this event listener from this cell so that nothing will happen when the user clicks on this cell
    this.removeEventListener("click", userClick, false);
    document.getElementById("play-message").style.opacity = "0%";

    if(bombArray.some(cell => cell === this)){
        this.getElementsByTagName("img")[0].setAttribute("src", "images/bomb.png");
        loseGame();
    } else {
        this.getElementsByTagName("img")[0].setAttribute("src", "images/clicked.png");
        if(this.getElementsByTagName("img")[0].src.includes("images/clicked.png") || this.getElementsByTagName("img")[0].src.includes("images/flag.png")){
            clickCounter++;
            if(clickCounter == grid.length**2 - (grid.length-1)){
                winGame();
            }
        }
        let number = getBombProximityNumber(this);
        if(number > 0) {
            this.textContent = getBombProximityNumber(this).toString();
            //this.style.setProperty("padding-top", "10px")
        }
        
    }
}


function winGame(){
    //Send win message
    stoptime = true; //for stopping timer in stopwatch
    var endMessage = document.createElement("h2"); 
    var restart = document.createElement("button"); 
    endMessage.textContent = "YOU WIN!";
    endMessage.setAttribute("id", "end-message"); 
    restart.textContent = "Play Again"; 
    restart.setAttribute("id", "restart"); 
    restart.setAttribute("onClick", "playAgain()")
    document.getElementById("message-container").appendChild(endMessage);
    document.getElementById("message-container").appendChild(restart); 
}

function loseGame(){
    //Send lose message
    stoptime = true; //for stopping timer in stopwatch
    var endMessage = document.createElement("h2"); 
    var restart = document.createElement("button"); 
    endMessage.textContent = "YOU LOSE!";
    endMessage.setAttribute("id", "end-message"); 
    restart.textContent = "Play Again"; 
    restart.setAttribute("id", "restart"); 
    restart.setAttribute("onClick", "playAgain()")
    document.getElementById("message-container").appendChild(endMessage);
    document.getElementById("message-container").appendChild(restart); 
}

function playAgain(){
    $("#end-message").remove(); 
    $("#restart").remove(); 
    location.reload(); 
}


function assignMines(){
    for (let i = 0; i < numBombs; i++) {
        var randomRow = bombGrid[Math.floor(Math.random() * bombGrid.length)];
        var randomCellIndex = Math.floor(Math.random() * randomRow.length);
        bombArray.push(randomRow.splice(randomCellIndex, 1)[0]);
    }
    console.log(bombArray);
}


function getBombProximityNumber(cell){
    //Mr. Mike says: This is really brilliant!!!
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
    let sum = 0;
    for (let i = 0; i < 8; i++) //8 possible displacements 
    {
        let adjacentRowIndex = cell.rowIndex + displacements[i][0];
        let adjacentColIndex = cell.colIndex + displacements[i][1];
        if (!(adjacentRowIndex < 0 || adjacentRowIndex > numRows-1)) {
            if (!(adjacentColIndex < 0 || adjacentColIndex > numCols-1)) {
                if (bombArray.some(bomb => bomb == grid[adjacentRowIndex][adjacentColIndex])) {
                    sum++;
                }
            } 
        }
    }
    return sum;
}
setInterval(stopwatch,1000)

makeGrid();
