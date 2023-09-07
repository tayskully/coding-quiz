var storedData = document.querySelector(".storedData");
var playerInitials = document.querySelector(".playerInitials");

var scores = JSON.parse(localStorage.getItem("scores")) || [];
var lastPlayer = scores[scores.length - 1];

playerInitials.textContent = lastPlayer.initials + " scored " + lastPlayer.score + " points!!";

scores.sort(function (a, b) {
  return b.score - a.score;
});

for (var i = 0; i < scores.length; i++) {
  var scoreList = document.createElement("li");
  var currentScore = scores[i];
  scoreList.textContent =
    currentScore.initials + " scored " + currentScore.score + " points";

  storedData.append(scoreList);
}
