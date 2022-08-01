const highScore = document.querySelector('#result');
const exit = document.querySelector('.exit');
const score = localStorage.getItem('highscore');
const userName = localStorage.getItem('username')
const showName = document.querySelector('#user');

showName.innerText = userName;
highScore.innerText = `${score}%`;

exit.addEventListener('click', (e) => {
    window.location.assign('quizapp.html');
    e.preventDefault;
})