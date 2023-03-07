const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const submitButton = document.getElementById('submit-btn');
const restartButton = document.getElementById('restart-btn');
const timerEl = document.getElementById('countdown');
var score = 0
var firstNameInput = document.querySelector("#first-name");
var showName = document.querySelector("#showName");
console.log(showName)

let shuffledQuestions, currentQuestionIndex

// Quiz button

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})


// Leaderboard for scores

function leaderboard() {
    var user = {
        firstName: firstNameInput.value.trim(),
        scoreNumber: score
    };
    localStorage.setItem('user', JSON.stringify(user));
    console.log(leaderboard)
};


//The countdown timer

function countdown() {
    var timeLeft = 5;
    
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = timeLeft + ' seconds remaining';
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timerEl.textContent = '';
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
            // Call the `displayMessage()` function
            scoreNumber = {
                
            }
            timerEl.textContent = 'Time is up ⌛'
            questionContainerElement.setAttribute('class', 'hide')
            nextButton.classList.add('hide');
            showName.classList.remove('hide');
            
        }
    }, 500);
}


//
function startQuiz() {
    countdown();
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        if (answer.correct) {
            button.dataset.correct = answer.correct
            score += 1
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function reloadPage (event){
    event.preventDefault();
    window.location.reload();

}
submitButton.addEventListener('click', leaderboard);
restartButton.addEventListener('click', reloadPage);

//question bank

const questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
      { text: 'strings', correct: false },
      { text: 'booleans', correct: true },
      { text: 'alerts', correct: false },
      { text: 'numbers', correct: false }
    ]
  },
  {
    question: 'Arrays in Javascript can be use to store',
    answers: [
      { text: 'numbers and strings', correct: true },
      { text: 'other arrays', correct: true },
      { text: 'booleans', correct: true },
      { text: 'All the above', correct: true }
    ]
  },
  {
    question: 'A very useful tool used during development and debugging is',
    answers: [
      { text: 'Javascript', correct: false },
      { text: 'terminal/bash', correct: false },
      { text: 'for loops', correct: true },
      { text: 'console.log', correct: false }
    ]
  },
  {
    question: 'The condition in an if/and statement is enclosed with',
    answers: [
      { text: 'quotes', correct: false },
      { text: 'curly brackets', correct: false },
      { text: 'parentehsis', correct: true },
      { text: 'square brackets', correct: false }
    ]
  }
]