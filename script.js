var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('questions')
var answerButtonsElement = document.getElementById('answer-btn')

var shuffleQuestions, currentQuestionIndex

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startQuiz(){
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answers => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function.resetState(){
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    var selectButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct) 
    });
    nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
    }


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

var questions = [
    {
        question: 'Do you enjoy coding?',
        answers: [
            {text: 'Sometimes', correct: false},
            {text: 'Nope', correct: false},
            {text: 'YES', correct: true},
            {text: 'Huh?', corect: false}
        ]
    }
]