const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const timerElement = document.getElementById("timer");
const submitButton = document.getElementById("submit-button");
const initialsInput = document.getElementById("initials");

let currentQuestionIndex = 0;
let timeLeft = 60; // in seconds
let timerIntervalId;
let score = 0;


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
    }
];

// Shuffle quiz questions
function shuffleQuestions(questions) {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
  }
  
  // Start the quiz
  function startQuiz() {
    shuffleQuestions(quizQuestions);
    // startButton.style.display = "none";
    // quizContainer.style.display = "block";
    showNextQuestion();
    startTimer();
    }
  
  // Show the next question
  function showNextQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    questionElement.textContent = question.question;
    answersElement.innerHTML = "";
    for (let i = 0; i < question.answers.length; i++) {
      const answer = question.answers[i];
      const answerButton = document.createElement("button");
      answerButton.textContent = answer;
      answerButton.addEventListener("click", function() {
        checkAnswer(answer);
      });
      answersElement.appendChild(answerButton);
    }
  }
  
  // Check if the answer is correct and show the next question
  function checkAnswer(answer) {
    const question = quizQuestions[currentQuestionIndex];
    if (answer === question.correctAnswer) {
      score++;
    } else {
      timeLeft -= 10; // Penalty for wrong answer
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showNextQuestion();
    } else {
      endQuiz();
    }
  }
  
  // Start the timer
  function startTimer() {
    timerIntervalId = setInterval(function() {
      timeLeft--;
      timerElement.textContent = "Time: " + timeLeft;
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  // End the quiz
  function endQuiz() {
    clearInterval(timerIntervalId);
    quizContainer.style.display = "none";
    submitButton.style.display = "block";
  }
  
  

  
  startButton.addEventListener("click", startQuiz);  


  // Handle form submission
  submitButton.addEventListener("click", endQuiz);



