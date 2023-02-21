// Define quiz questions
const quizQuestions = [
    {
      question: "Which of the following is NOT a valid way to declare a variable in JavaScript?",
      answers: ["let x = 5;", "var y = 6;", "const z = 7;", "variable w = 8;"],
      correctAnswer: "variable w = 8;"
    },
    {
      question: "What will be the output of the following code?\nlet x = 5;\nlet y = '3';\nconsole.log(x + y);",
      answers: ["8", "'53'", "'35'", "TypeError"],
      correctAnswer: "'53'"
    },
    {
      question: "What is the result of the following comparison?\n3 == '3'",
      answers: ["true", "false", "TypeError", "undefined"],
      correctAnswer: "true"
    },
    {
      question: "What is the output of the following code?\nlet arr = [1, 2, 3];\nconsole.log(arr.length);",
      answers: ["1", "2", "3", "4"],
      correctAnswer: "3"
    },
    {
      question: "What is the result of the following expression: Boolean('false')",
      answers: ["false", "true", "TypeError", "undefined"],
      correctAnswer: "true"
    }
  ];
  
  // Define variables
  const startButton = document.querySelector("#start-button");
  const quizContainer = document.querySelector("#quiz-container");
  const questionElement = document.querySelector("#question");
  const answerButtons = document.querySelector("#answer-buttons");
  const timeElement = document.querySelector("#time");
  const initialsForm = document.querySelector("#initials-form");
  const initialsInput = document.querySelector("#initials");
  const submitButton = document.querySelector("#submit-button");
  const highscoresContainer = document.querySelector("#highscores-container");
  const highscoresList = document.querySelector("#highscores-list");
  const backButton = document.querySelector("#back-button");
  const clearButton = document.querySelector("#clear-button");
  const viewHighscoresButton = document.querySelector("#view-highscores");
  
  let currentQuestionIndex = 0;
  let timeLeft = 60;
  let timerIntervalId;

  startButton.addEventListener("click", startQuiz);

  
  // Start the quiz
  function startQuiz() {
    // Hide start button and show quiz container
    startButton.classList.add("hide");
    quizContainer.classList.remove("hide");
  
    // Display first question
    displayQuestion(currentQuestionIndex);
  
    // Start timer
    timerIntervalId = setInterval(updateTime, 1000);
  }
  
  function updateTime() {
    timeLeft--;
  
    // Update time element
    timeElement.innerText = timeLeft;
  
    // Check if time has run out
    if (timeLeft === 0) {
      clearInterval(timerIntervalId);
      endGame();
    }
  }
  
  
  // Display a question
  function displayQuestion(index) {
    // Clear previous answer buttons
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  
    // Get current question
    const currentQuestion = quizQuestions[index];
  
    // Update question text
    questionElement.innerText = currentQuestion.question;
  
    // Add answer buttons
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerText = answer;
      button.classList.add("btn", "btn-primary");
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }
  
  // Select an answer
  function selectAnswer(event) {
    // Get selected answer
    const selectedButton = event.target;
    const selectedAnswer = selectedButton.innerText;
  
    // Check if answer is correct
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      // Display "Correct!" message
      const message = document.createElement("p");
      message.innerText = "Congrats!";
      message.classList.add("text-success");
      answerButtons.appendChild(message);
  
      // Advance to next question
      currentQuestionIndex++;
      if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion(currentQuestionIndex);
      } else {
        // All questions have been answered, end the game
        endGame();
      }
    };
}

// submitButton.addEventListener("click", submitInitials);

function endGame() {
  // Stop the timer
  clearInterval(timerIntervalId);

  // Hide the quiz container and show the initials form
  quizContainer.classList.add("hide");
  initialsForm.classList.remove("hide");

  // Display the final score
  const score = timeLeft;
  const scoreMessage = document.createElement("p");
  scoreMessage.innerText = "Your final score is " + score;
  highscoresContainer.appendChild(scoreMessage);

  // Save the score to local storage
  const initials = initialsInput.value;
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push({ initials: initials, score: score });
  localStorage.setItem("highscores", JSON.stringify(highscores));

  // Display the highscores
  displayHighscores();
}

function displayHighscores() {
  // Hide the initials form and show the highscores container
  initialsForm.classList.add("hide");
  highscoresContainer.classList.remove("hide");

  // Clear previous highscores
  while (highscoresList.firstChild) {
    highscoresList.removeChild(highscoresList.firstChild);
  }

  // Get highscores from local storage and sort them in descending order
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.sort((a, b) => b.score - a.score);

  // Display highscores
  highscores.forEach((highscore, index) => {
    const highscoreItem = document.createElement("li");
    highscoreItem.innerText = `${index + 1}. ${highscore.initials}: ${highscore.score}`;
    highscoresList.appendChild(highscoreItem);
  });
}

