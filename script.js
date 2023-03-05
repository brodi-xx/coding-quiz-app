var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-btn')

let shuffleQuestions, currentQuestionIndex

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
    
   // setTimeout(function () {
   //     e.target.setAttribute('style', "background-color: aquamarine");
    //    startButton++;
    //    question();
    //}, 60)
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

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    var selectButton = e.target
    var correct = selectedButton.dataset.correct
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

const questions = [
    {
        question: 'Do you enjoy coding?',
        answers: [
            {text: 'Sometimes', correct: false},
            {text: 'Nope', correct: false},
            {text: 'YES', correct: true},
            {text: 'Huh?', corect: false}
        ],
        question: 'Who is your favorite TA?',
        answers: [
            {text: 'Zack', correct: true},
            {text: 'Gunner', correct: true},
            {text: 'Andrea', correct: true},
            {text: 'All the above', correct: true}
        ],
        question: 'What does HTML stand for?',
        answers: [
            {text: 'Hyper Technical Moms Language', correct: false},
            {text: 'Hyperbolic Time Movement Larrys', correct: false},
            {text: 'Hypertext Markup Language', correct: true},
            {text: 'Hippo Teach Monkeys Love', correct: false}
        ]
    }
]