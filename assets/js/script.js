//DEPENDENCIES==================================
var timerEl = document.querySelector(".timer");
var quizContainerEl = document.querySelector(".quiz-container");
var startButton = document.querySelector("#startBtn");
var questionEl = document.querySelector("#question");
var answerButtons = document.querySelector("#answer-buttons");
var score = document.querySelector("#final-score");

//DATA==========================================
//highscores in local data
var highScore = 0;

//initals from user input
var userInitials = "";

var timer;
//final score

//questions and answers
var currentQuestionIndex = 0;
var score = 0;

var quizData = [
  {
    question: "What is my favorite color?",
    answers: [
      { text: "ripe red", correct: false },
      { text: "sunset orange", correct: true },
      { text: "royal blue", correct: false },
      { text: "coral pink", correct: false },
    ],
  },
  {
    question: "What is my favorite movie?",
    answers: [
      { text: "Superbad", correct: false },
      { text: "The Departed", correct: false },
      { text: "Creature from the Black Lagoon", correct: false },
      { text: "Amelie", correct: true },
    ],
  },
  {
    question: "What is my favorite fruit?",
    answers: [
      { text: "raspberry", correct: true },
      { text: "orange", correct: false },
      { text: "blueberry", correct: false },
      { text: "tomato", correct: false },
    ],
  },
  {
    question: "What is my cat's name?",
    answers: [
      { text: "Juniper", correct: false },
      { text: "Orange", correct: false },
      { text: "Phin", correct: true },
      { text: "Parker", correct: false },
    ],
  },
];

//FUNCTIONS=====================================
//will retrieve stored data from previous wins
function init() {
  getWins();
  getlosses();
}

//gameplay function

function startGame() {
  console.log("starting game");
  hideIntro();
  startTimer();

  nextQuestion();

  //homepage disappears
  //first question is presented
  //user click received
  //answer is correct or incorrect
  //score is added to (either 0 or 1)
  //question disappears
  //next question appears
}

function hideIntro() {
  document.querySelector(".home-screen").classList.add("hide")
  document.querySelector(".quiz-container").classList.remove("hide")
    console.log("trying to hide");
}

function startTimer() {
  console.log("starting timer");
  timerCount = 60;
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerEl.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      //   if (isWin && timerCount > 0) {
      //is win ?????
      // Clears interval and stops timer
    //   clearInterval(timer);
      // winGame();
    }

    // Tests if time has run out
    if (timerCount <= 0) {
      // Clears interval
      showScore()
    //   loseGame();
    }
  }, 1000);
}


//leaned heavily on code from youtube man
function nextQuestion() {
  //resetState();
  answerButtons.innerHTML = ""
  console.log("next question");
  var currentQuestion = quizData[currentQuestionIndex];
  var questionNo = currentQuestionIndex + 1;
  questionEl.innerHTML = questionNo = ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// function resetState() {
//   while (answerButtons.firstChild) {
//     answerButtons.removeChild(answerButtons.firstChild);
//   }
// }

function handleNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    nextQuestion();
  } else {
    showScore();
  }
}

function showScore() {
    //resetState();
    clearInterval(timer)
    questionEl.innerHTML = "you scored " + score + " points";
    //display high score form
    showForm();
    //add your initals
    // function logHighScore () {}
  }

function showForm () {
    document.querySelector(".quiz-container").classList.add("hide");
    document.querySelector(".score-container").classList.remove("hide");
  }

function selectAnswer(event) {
  var selectedBtn = event.target;
  var isCorrect = selectedBtn.dataset.correct === "true";
var displayRightWrong = document.querySelector(".result");

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    displayRightWrong.textContent ="Right!"
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    displayRightWrong.textContent ="WRONG!";
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  if (currentQuestionIndex < quizData.length) {
    return handleNext();
  }
}

function stopGame() {
  console.log("stopping game");
}
//GAME OVER appears with prompt to input initials
//initials are stored in high score scoreboard

// function getScore() {
//     // Get stored value from client storage, if it exists
//     var storedScore = localStorage.getItem("scoreCount");
//     // If stored value doesn't exist, set counter to 0
//     if (storedScore === null) {
//       winCounter = 0;
//     } else {
//       // If a value is retrieved from client storage set the winCounter to that value
//       winCounter = storedWins;
//     }
//     //Render win count to page
//     win.textContent = winCounter;
//   }
//   function getlosses() {
//     var storedLosses = localStorage.getItem("loseCount");
//     if (storedLosses === null) {
//       loseCounter = 0;
//     } else {
//       loseCounter = storedLosses;
//     }
//     lose.textContent = loseCounter;
//   }

//USER INTERACTIONS=============================

//click start button
//click correct answer
//input high score initials last page

//INITIALIZATIONS===============================
// start game
// start timer countdown
startButton.addEventListener("click", startGame, nextQuestion);
// end game
//add to scoreboard
