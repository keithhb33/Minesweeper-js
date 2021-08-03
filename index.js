window.onload = onLoad;

function hideSquares(columnsArray){
    for(let i=1; i<=columnsArray.length; i++){
        for(let j=0; j<columnsArray.length; j++){
            var allSquares = document.getElementById(columnsArray[j] + "-" + i.toString());
                allSquares.style.visibility = "hidden";
        }
    }
}

function addFlag(columnsArray, clickedSquare){


}   



function onLoad(){

$(".play-button").on("click", function(){
    var playButton = document.getElementById("play-button");
        playButton.style.visibility = "hidden";
    
    var containerElements = document.querySelectorAll(".container img");
    for (let i = 0; i < containerElements.length; i++) {
        containerElements[i].style.cursor = "pointer";
    }

    var columnsArray = ["a", "b", "c", "d"];
    var clickCounter = 0;

    var randomRow = (Math.floor(Math.random() * 4) + 1).toString();
    var randomColumn = (columnsArray[Math.floor(Math.random() * 4)]).toString();
    var bomb1 = document.getElementById("bomb-1");
    bomb1.id = randomColumn + "-" + randomRow;

    console.log(bomb1.id);

    
    for(let i=1; i<=columnsArray.length; i++){
        for(let j=0; j<columnsArray.length; j++){
            //Add flag event
            $("#" + columnsArray[j] + "-" + i.toString()).mousedown(function(event) {
                var clickedSquare = document.getElementById(columnsArray[j] + "-" + i.toString());
                if (clickedSquare.src.includes("images/unclicked.png")){
                    switch (event.which) {
                        case 3:
                            clickedSquare.src = "images/flag.png";
                    }
                }
            });

            $("#" + columnsArray[j] + "-" + i.toString()).on("click", function(){
                var clickedSquare = document.getElementById(columnsArray[j] + "-" + i.toString());
                console.log(clickedSquare.src);
                console.log(clickedSquare.id);

                //Click counter only increases if click on unclicked square
                if(clickedSquare.src.includes("images/unclicked.png") || clickedSquare.src.includes("images/flag.png")){
                    clickCounter++;
                    console.log(clickCounter);
                }
                clickedSquare.src = "images/clicked.png";
                clickedSquare.style.cursor = "auto";

                //LOSE GAME EVENT || add bomb2+ to if statement for future)
                if(clickedSquare.id == bomb1.id){
                    clickedSquare.style.zIndex = "-1";
                    var loseMessage = document.getElementById("lose-message");
                    loseMessage.style.visibility = "visible";
                    hideSquares(columnsArray);

                    //Maybe add explosion animation at a loss
                }

                //WIN GAME EVENT
                if(clickCounter == columnsArray.length**2-1 && clickedSquare.id != bomb1.id){
                    playButton.style.cursor = "default";
                    var winMessage = document.getElementById("win-message");
                    winMessage.style.visibility = "visible";
                    hideSquares(columnsArray);
                }
                //for a 10x10, can just do copypaste, but, maybe split the 10x10 into two 4x4's and one 2x2. 

                //ADD FLAG EVENT



            });
        }
    }





});
}
