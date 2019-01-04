let score = 0;


// update player's score
function levelOver() {
    if (level_no === 1) {
        score += (timeLimit - counter);
    } else if (level_no === 2) {
        score += 2*(timeLimit - counter);
    } else if (level_no === 3) {
        score += 6*(timeLimit - counter);
    } else {
        score += 4*(timeLimit - counter);
    }
}


function compareScores() {
    if (!localStorage.highscores) {
        localStorage.highscores = score + "points_";
    } else {
        localStorage.highscores += score + "points_";
    }
            let high = JSON.parse(localStorage.highscores);
            console.log(typeof high);
            console.log(high);
}