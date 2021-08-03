function stopwatch() {
    const timer = document.getElementById("");
    var mins = 0;
    var sec = 0;
    var stoptime = true;
    
    if(stoptime == True) {
        timer.innerHTML = "0:00";
        sec = 0;
        min = 0;
    }
    if(document.getElementsByClassName("cell").clicked == true) {
          stoptime = false;
    }
    if(document.getElementById("").clicked == True) {
      stoptime = true;
    }
    if(stoptime == false) {
        sec = parseInt(sec);
        mins = parseInt(mins);
        sec++;

        if (sec == 60) {
        mins++;
        sec = 0;
    }
    timer.innerHTML = mins + ':' + sec;

    setTimeout("timerCycle()", 1000);
  }
}
function endGame() {
    var mine = ("-1");
    // if mouse click on mine game ends, document shows "Game Over"//
    if (mine.clicked == true) {
        alert("Game Over");
    }
}