"use strict";



function Game() {

      this.level = 3;
      this.timeRunOut = false;
}
// initializing each new level
Game.prototype.init = function () {

      if (!this.timeRunOut) {
            this.level++;
            if (this.level !== 5) {
                  // creating new level and creating/updating player object(s)
                  if (this.level === 1) {
                        player = new Player();
                  } else {
                        player = new Player();
                        // player.levelUp();
                  }
                  lvl = new Level(this.level);
                  let boards = lvl.drawBoards();
                  return boards;
            } else {
                  game.calculateScore();
            }
      } else {
            game.calculateScore();
      }
};
// calculating player's score
Game.prototype.calculateScore = function () {

      // change display
};





function Level(no) {

      this.no = no;
      this.boards;
      this.boardCards;
      this.timeLimit;
      this.timeElapsed = 0;
      this.rightTurnsNo;
      this.playerHits = 0;
      this.icons;
      switch (this.no) {
            case 1:
                  this.boards = 1;
                  this.boardCards = 16;
                  this.timeLimit = 60;
                  this.rightTurnsNo = 8;
                  this.icons = icons1;
                  break;
            case 2:
                  this.boards = 2;
                  this.boardCards = 16;
                  this.timeLimit = 120;
                  this.rightTurnsNo = 16;
                  this.icons = icons2[0];
                  break;
            case 3:
                  this.boards = 1;
                  this.boardCards = 64;
                  this.timeLimit = 240;
                  this.rightTurnsNo = 32;
                  this.icons = icons3;
                  break;
            case 4:
                  this.boards = 3;
                  this.boardCards = 16;
                  this.timeLimit = 300;
                  this.rightTurnsNo = 16;
                  this.icons = icons4[0];
                  break;
            default:
                  break;
      }
}
// function drawing up the boards
Level.prototype.drawBoards = function () {
      let inside = '';
      for (let i = 0; i < this.boards; i++) {
            inside += '<div class="board' + this.no + '">';
            for (let j = 0; j < this.boardCards; j++) {
                  inside += '<div class="box"><div class="back">' + this.randomIcon() + '</div><div class="front"></div></div>';
            }
            inside += '</div>';
      }
      return inside;
};
// function returning random icons from the relevant icons array
Level.prototype.randomIcon = function () {

      let n = Math.floor(Math.random() * this.icons.length);
      let icon;
      if (this.no === 1 || this.no === 3) {
            icon = this.icons[n];
            this.icons.splice(n, 1);
      } else if (this.no === 2) {
            icon = this.icons[n];
            this.icons.splice(n, 1);
            if (!icons2[0].length) {
                  this.icons = icons2[1];
            }
      } else if (this.no === 4) {
            icon = this.icons[n];
            this.icons.splice(n, 1);
            if (!icons4[0].length) {
                  if (!icons4[1].length) {
                        this.icons = icons4[2];
                  } else {
                        this.icons = icons4[1];
                  }
            }
      }
      return icon;
};






function Player() {

      this.turned = [];
      this.move_no = 0;
      this.score = 0;
}

Player.prototype.levelUp = function () {

      this.turned = [];
      this.move_no = 0;
      this.score += this.calculateScore();
      console.log(this.score);
};
// returning number of points player scored on level he just won
Player.prototype.calculateScore = function () {

      switch (lvl.no) {
            case 1:
                  return (lvl.timeLimit - lvl.timeElapsed);
                  break;
            case 2:
                  return (lvl.timeLimit - lvl.timeElapsed) * 2;
                  break;
            case 3:
                  return (lvl.timeLimit - lvl.timeElapsed) * 4;
                  break;
            case 4:
                  return (lvl.timeLimit - lvl.timeElapsed) * 5;
                  break;
            default:
                  break;
      }
};
// function determining if player got his 2/3 turns right
Player.prototype.isItSame = function () {

      let box1 = this.turned[this.turned.length - 1];
      let box2 = this.turned[this.turned.length - 2];
      let back1 = box1.querySelector(".back");
      let back2 = box2.querySelector(".back");
      if (lvl.no !== 4) {
            this.move_no = 0;
      } else {
            if (this.move_no === 3) {
                  this.move_no = 0;
            }
      }
      if (back1.querySelector("i").className === back2.querySelector("i").className) {
            return [true, null, null];
      } else {
            if (lvl.no !== 4) {
                  return [false, box1, box2];
            }  else {
                  this.move_no = 0;
                  let box3 = this.turned[this.turned.length - 3];
                  return [false, box1, box2, box3];
            }
      }
};