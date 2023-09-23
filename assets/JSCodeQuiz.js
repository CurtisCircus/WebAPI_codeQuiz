var startQuiz = document.getElementById("start");
var time =document.getElementById("timer");
var questionText = document.getElementById("question");
var answerText = document.getElementById("answers");
var playerAnswer = "";
var timeInterval;

const quizQuestions = [
    {
      question: 'Which of these would have a "false" value',
      choices: ['a) 2 == two ', 'b) 2 === 2 ', 'c) "2" === 2'],
      answer: 2,
    },
    {
      question: 'What is a boolean?',
      choices: ['a) A variable with a true and false value ', 'b) A variable with a 0 value ', 'c) A variable with a value of Pi'],
      answer: 0,
    },
    {
      question: 'What code is commonly used to style a website?',
      choices: ['a) HTML', 'b) CSS', 'c) Javascript'],
      answer: 1,
    }
  ];

  startQuiz.addEventListener("click", function(){
    startQuiz.remove();
    startGame();
  });

  
  var currentQuestionIndex = 0;
  var score = 0;
  var timeLeft = 91;

  function startGame() {
    startTimer();
    displayQuestion();
    var submitButton = document.createElement('button');
    var buttonDiv = document.getElementById('buttonElement');
        buttonDiv.appendChild(submitButton);
        submitButton.textContent = 'Submit';
        submitButton.setAttribute('id', 'submit')
        submitButton.addEventListener('click', function(){
          checkAnswer();
        })
  }

  function startTimer() {
    var timer = time;
    timeInterval = setInterval(function () {
      timeLeft--;
      timer.textContent = timeLeft;
      if (timeLeft <= 0) {
        gameOver();
      }
    }, 1000);
  }

  function displayQuestion() {
    
      questionText.textContent = quizQuestions[currentQuestionIndex].question;
      answerText.textContent = "";
      for (var i = 0; i < quizQuestions[currentQuestionIndex].choices.length; i++){
        var inputOption = document.createElement('input');
        inputOption.setAttribute('type', 'radio');
        inputOption.setAttribute('value', i);
        inputOption.setAttribute('name', 'quizquestion');
        inputOption.setAttribute('id', 'question'+i);
        var labelElement = document.createElement('label');
        labelElement.setAttribute('htmlFor', 'question' +i);
        labelElement.innerHTML = quizQuestions[currentQuestionIndex].choices[i];
        answerText.appendChild(inputOption);
        answerText.appendChild(labelElement);
      }
  }

  function checkAnswer() {
    const question = quizQuestions[currentQuestionIndex].answer;
    if (document.querySelector("input[name='quizquestion']:checked").value == question) {
      score++;
    } else {
      timeLeft -=5;
      return;
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion();
    } else {
      gameOver();
    }
  }

  function gameOver() {
    clearInterval(timeInterval);
    timeLeft = 0;
    var userName = prompt("The quiz is over! Your score is "+ score +". Enter your name to save your score.");
    localStorage.setItem("userName", userName);
    localStorage.setItem("score", score);
  }