//declaring the variables
const userName = document.querySelector('#username');
const validateInput = document.querySelector('.validateInput');
const startTest = document.querySelector('#start');

startTest.addEventListener('click', () =>{
    if(!userName.value){
        validateInput.innerText = 'please enter your name';
    }else{
        localStorage.setItem('username', userName.value)
        window.location.assign('quizpage.html');
    }
})
