const question = document.querySelector('.question');
const options = Array.from(document.querySelectorAll('.optionsParam'));
const nextQuestion = document.querySelector('.btn');
const questioncounterText = document.querySelector('.questionTag');
const choices = Array.from(document.querySelectorAll('input[name="options"]'));
const progressBar = document.querySelector('.progressBarFull')
const timer = document.querySelector('#timer');
const loader = document.querySelector('#loader');
const questionContainer = document.querySelector('.questionContainer')


let currentQuestion = {};
let score = 0;
let acceptAnswers = false;
let questionCounter = 0;
let availableQuestion =[];



let questionBank =[];

fetch('https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple')
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questionBank = loadedQuestions.results.map( loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            }
            const answerChoices = [...loadedQuestion.incorrect_answers];
            const correctAnswer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(correctAnswer-1, 0, loadedQuestion.correct_answer);

            answerChoices.map( (answerchoice, index) => {
               formattedQuestion['option' + (index + 1)] = answerchoice; 
            })
            formattedQuestion.answer = correctAnswer;
            return formattedQuestion;
        })
        questionContainer.style.display = 'flex';
        loader.style.display = 'none'
        startQuiz();
    })

const maxQuestion = 10;

startQuiz = () => {
    score = 0;
    questionCounter = 0;
    availableQuestion = [...questionBank];
    console.log(availableQuestion);
    getNewQuestion();
}

getNewQuestion = () => {
    questionCounter++;
    questioncounterText.innerText = ` Question ${questionCounter} of ${maxQuestion}`;
    progressBar.style.width = `${(questionCounter/maxQuestion) * 100}%`
    let questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    options.forEach( option =>{
        const number = option.dataset['number'];
        option.innerText = currentQuestion['option'+ number]; 
    })
    availableQuestion.splice(questionIndex, 1);
    acceptAnswers = true;
};

getAnswer = () =>{
    choices.forEach( choice => {
        if(choice.checked){
            if(choice.value == currentQuestion.answer){
                score = score + 1;
            }
    }
    })
    return score;
}

//Next Button
nextQuestion.addEventListener('click', () =>{
    getAnswer();
    localStorage.setItem('highscore', eval(Math.floor(score/maxQuestion * 100)))
    if(availableQuestion.length <= 40){
        
        window.location.assign('quizresult.html')
    }
        setTimeout(()=>{
            getNewQuestion();
    
        }, 1000)
})

const totalMinutes = 10;
let totalSeconds = totalMinutes * 60;

setTimer = () => {

    let minutes = Math.floor(totalSeconds/60);
    let seconds = totalSeconds % 60;
    if (seconds < 10){
        seconds = `0${seconds}`
    }
    timer.innerText = `${minutes} : ${seconds}`;
    totalSeconds--;
}
setInterval(setTimer, 1000)
