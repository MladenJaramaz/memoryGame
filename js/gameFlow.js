"use strict";




let gameArea = document.querySelector("#gameArea");
let lvlDisp = document.querySelector("#levelNo");
let stopwatch = document.querySelector("#stopwatch");
let timeLimit = document.querySelector("#timeLimit");
let timeElapsed = document.querySelector("#timeElapsed");
// function determining if current level is over
Level.prototype.isItOver = function () {

  this.playerHits++;
  if (this.playerHits === this.rightTurnsNo) {
    // resetting the timer
    stopwatch.style.backgroundColor = "darkgreen";
    stopwatch.style.height = "0";
    stopwatch.style.top = "642px";
    clearInterval(int);
    boxInit();
  }
};





// initializing the game
//  drawing the board(s) and adding event listeners for each new level
let lvl;
let player;
let boxes;
let int;
let game = new Game();

function boxInit() {


  gameArea.innerHTML = game.init();
  //adding event listeners to each new set of boxes 
  boxes = document.querySelectorAll(".box");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", turnMe);
  }
  lvlDisp.innerHTML = "Level " + lvl.no;
  timerInit();
}
boxInit();




// function initializing the timer 
function timerInit() {

  timeLimit.innerHTML = lvl.timeLimit;
  let height = 0;
  let top = 642;
  int = setInterval(function () {

    // stopwatch
    lvl.timeElapsed++;
    timeElapsed.innerHTML = lvl.timeElapsed;
    // animation
    height += 642 / lvl.timeLimit;
    top -= 642 / lvl.timeLimit;
    stopwatch.style.height = height + "px";
    stopwatch.style.top = top + "px";
    if (lvl.timeElapsed === (lvl.timeLimit * 0.25)) {
      stopwatch.style.backgroundColor = "darkgoldenrod";
    } else if (lvl.timeElapsed === (lvl.timeLimit * 0.5)) {
      stopwatch.style.backgroundColor = "darkmagenta";
    } else if (lvl.timeElapsed === (lvl.timeLimit * 0.75)) {
      stopwatch.style.backgroundColor = "maroon";
    } else if (lvl.timeElapsed >= lvl.timeLimit) {
      clearInterval(int);
      game.timeRunOut = true;
      game.init();
    }
  }, 1000);
}






// function doing tun animation and calling funcs to check if user hit right
function turnMe() {

  // animation
  player.move_no++;
  let back = this.querySelector(".back");
  let front = this.querySelector(".front");
  back.style.transform = "perspective(900px) rotateY(0)";
  front.style.transform = "perspective(900px) rotateY(180deg)";
  player.turned.push(this);
  for (let i = 0; i < player.turned.length; i++) {
    player.turned[i].removeEventListener("click", turnMe);
  }
  // checking if same
  if (player.move_no === 2) {

    setTimeout(function () {
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", turnMe);
      }
      // removing event listeners from turned boxes  
      for (let i = 0; i < player.turned.length; i++) {
        player.turned[i].removeEventListener("click", turnMe);
      }
    }, 900);

    let rightHit = player.isItSame();
    if (rightHit[0]) {
      if (lvl.no !== 4) {
        lvl.isItOver();
      }
    } else {
      //  animation
      setTimeout(function () {
        let front1 = rightHit[1].querySelector(".front");
        let back1 = rightHit[1].querySelector(".back");
        let front2 = rightHit[2].querySelector(".front");
        let back2 = rightHit[2].querySelector(".back");
        front1.style.transform = "perspective(900px) rotateY(0)";
        back1.style.transform = "perspective(900px) rotateY(180deg)";
        front2.style.transform = "perspective(900px) rotateY(0)";
        back2.style.transform = "perspective(900px) rotateY(180deg)";
      }, 800);
      player.turned.splice((player.turned.length - 2), 2);
    }
  } else if (player.move_no === 3) {
    setTimeout(function () {
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", turnMe);
      }
      // removing event listeners from turned boxes  
      for (let i = 0; i < player.turned.length; i++) {
        player.turned[i].removeEventListener("click", turnMe);
      }
    }, 900);
    let rightHit = player.isItSame();
    if (rightHit[0]) {
      lvl.isItOver();
    } else {
      setTimeout(function () {
        let front1 = rightHit[1].querySelector(".front");
        let back1 = rightHit[1].querySelector(".back");
        let front2 = rightHit[2].querySelector(".front");
        let back2 = rightHit[2].querySelector(".back");
        let front3 = rightHit[3].querySelector(".front");
        let back3 = rightHit[3].querySelector(".back");
        front1.style.transform = "perspective(900px) rotateY(0)";
        back1.style.transform = "perspective(900px) rotateY(180deg)";
        front2.style.transform = "perspective(900px) rotateY(0)";
        back2.style.transform = "perspective(900px) rotateY(180deg)";
        front3.style.transform = "perspective(900px) rotateY(0)";
        back3.style.transform = "perspective(900px) rotateY(180deg)";
      }, 800);
      player.turned.splice((player.turned.length - 3), 3);
    }
  }
}