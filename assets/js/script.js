//DEPENDENCIES==================================
var timerEl = document.querySelector(".timer");
var quizContainerEl = document.querySelector(".quiz-container");
var startButton = document.querySelector("#startBtn");
var questionEl = document.querySelector("#question");
var answerButtons = document.querySelector("#answer-buttons");
var scoreEl = document.querySelector("#final-score");
var yourScore = document.querySelector(".your-score");
var displayRightWrong = document.querySelector(".result");
var initialsInput = document.querySelector("#initials");
var inputWarning = document.querySelector(".warning");

//DATA==========================================
var timer;
//final score

//questions and answers
var currentQuestionIndex = 0;
var score = 0;

var quizData = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "JS", correct: false },
      { text: "script", correct: true },
      { text: "javascript", correct: false },
      { text: "scripting", correct: false },
    ],
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
      { text: "the head section", correct: false },
      { text: "the footer section", correct: false },
      { text: "the body section", correct: false },
      { text: "both the head and the body section", correct: true },
    ],
  },
  {
    question: "How does a WHILE loop start?",
    answers: [
      { text: "while (i <= 10)", correct: true },
      { text: "while (i <=> 10; i++)", correct: false },
      { text: "while i = 1 to 10", correct: false },
      { text: "while (i <= 10; i++)", correct: false },
    ],
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    answers: [
      { text: "onchange", correct: false },
      { text: "onmouseclick", correct: false },
      { text: "onclick", correct: true },
      { text: "onmouseover", correct: false },
    ],
  },
];
//FUNCTIONS=====================================
//will retrieve stored data from previous wins
function init() {
  getScore();
}
//gameplay function
function startGame() {
  hideIntro();
  startTimer();
  //first question is presented
  nextQuestion();
}
//homepage disappears
function hideIntro() {
  document.querySelector(".home-screen").classList.add("hide");
  document.querySelector(".quiz-container").classList.remove("hide");
}
// Sets timer
function startTimer() {
  timerCount = 45;
  timer = setInterval(function () {
    timerCount--;
    timerEl.textContent = timerCount;
    //if time has run out
    if (timerCount <= 0) {
      showScore();
    }
  }, 1000);
}
//leaned heavily on tutorial linked in README
function nextQuestion() {
  answerButtons.innerHTML = "";
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
function selectAnswer(event) {
  var selectedBtn = event.target;
  var isCorrect = selectedBtn.dataset.correct === "true";
  var timeout = setTimeout(handleNext, 800);

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    displayRightWrong.textContent = "Right 🥳 ";
    score += 10;
  } else {
    selectedBtn.classList.add("incorrect");
    displayRightWrong.textContent = "WRONG! 🥵 -10 secs!!!";
    timerCount -= 10;
    console.log(timerCount);
    if (timerCount < 0) {
      timerCount === 0;
    }
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  if (currentQuestionIndex < quizData.length) {
    return timeout;
  }
}

function handleNext() {
  console.log("handle next");
  displayRightWrong.textContent = " ";
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    nextQuestion();
  } else {
    showScore();
  }
}
function showScore() {
  console.log(score);
  clearInterval(timer);
  yourScore.innerHTML = "you scored " + score + " points";
  //display high score form
  //add element to link form to
  showForm();
}

function showForm() {
  document.querySelector(".quiz-container").classList.add("hide");
  document.querySelector(".score-container").classList.remove("hide");
}

document
  .getElementById("submitBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    var initials = initialsInput.value;

    if (initials === "") {
      displayMessage("Want to start over? hit refresh");
    } else {
      displayMessage("registered successfully, check out the High Scores!");
    }
    var scores = JSON.parse(localStorage.getItem("scores")) || [];

    //get input data initials
    var initialsObject = {
      initials,
      score,
    };
    scores.push(initialsObject);
    //store together with score in array

    localStorage.setItem("scores", JSON.stringify(scores));
    renderScores();
  });

function displayMessage(message) {
  var messageDisplay = document.querySelector("#add-text");
  messageDisplay.textContent = message; 
  messageDisplay.style.display= "inline"; //re-ads it after it displays none
  setTimeout(() => {
    messageDisplay.style.display = "none";
  }, 2000);
}

function renderScores() {
  // Get stored value from client storage, if it exists(passed in through scores)
  var scores = JSON.parse(localStorage.getItem("scores")) || [];
  console.log(scores);

  // if (pastScores === null || pastScores === "") {
  //   return getData.textContent = pastScores;
}

//INITIALIZATIONS===============================
// start game
startButton.addEventListener("click", startGame, nextQuestion);
