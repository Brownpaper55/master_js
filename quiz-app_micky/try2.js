
const questions  =[
    {
    question: 'which is the largest animal on earth',
    answers: [
        {'text':'dog', 'correct':false},
        {'text':'Whale', 'correct':true},
        {'text':'Elephant', 'correct':false},
        {'text':'Cat', 'correct':false}
    ]},
    {
    question: 'what is the fastest animal on earth',
    answers: [
        {'text':'dog', 'correct':false},
        {'text':'Whale', 'correct':false},
        {'text':'Elephant', 'correct':false},
        {'text':'Cheetah', 'correct':true}
    ]},
    {
    question: 'what is the smartest animal on earth',
    answers: [
        {'text':'ant', 'correct':true},
        {'text':'Whale', 'correct':false},
        {'text':'Elephant', 'correct':false},
        {'text':'Cat', 'correct':false}
    ]},
    {
    question: 'what is the finest animal on earth',
    answers: [
        {'text':'dog', 'correct':true},
        {'text':'Whale', 'correct':false},
        {'text':'Elephant', 'correct':false},
        {'text':'Cat', 'correct':false}
    ]},  
]


let scoreEL = document.getElementById('score');
let timeEL = document.getElementById('time');
const questionEL = document.getElementById('question');
const answerEL = document.getElementById('answer-buttons');
const nextEL = document.getElementById('next-btn');


let currentQuestionIndex = 0;
let score = 0;
let timer = 0;
let timerInterval;


//this functions starts the quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    timer = 5
    nextEL.innerText = 'Next';
    //clear an existing time interval
    if (timerInterval){
        clearInterval(timerInterval)
    }
    showQuestion();
    timerInterval = setInterval(updatetime,1000);
    
}


// this functions is responsible for displaying the question
function showQuestion(){
    resetState()
   
    let currentQuestion = questions[currentQuestionIndex];
    let QuestionNo = currentQuestionIndex + 1;
    questionEL.innerHTML = QuestionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach((answer)=>{
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerEL.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    })
}


// this function displays the next question in line and hides the next button until an answer is selected
function resetState(){
    nextEL.style.display = "none";
    while(answerEL.firstChild){
        answerEL.removeChild(answerEL.firstChild)
    }
    scoreEL.innerHTML = score;
    
   

}


//This function updates the score and disables the answer buttons after an answer is selected
function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect){
        selectedBtn.classList.add('correct')
        score++;
    }else{
        selectedBtn.classList.add('incorrect')
        score--;
    }
    Array.from(answerEL.children).forEach(button=>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true;
    })
    nextEL.style.display = 'block';
}


//this function checks the time
function updatetime(){
   
    timer--;
    timeEL.innerHTML = timer;
    
    if(timer == 0){
        timer += 5
        
        if(currentQuestionIndex < questions.length){
            handleNextBtn();
    
        }else{
            showScore()
            timer = '0:00'
        }
        
    }
    }
   

// this function shows the score after the quiz is completed
function showScore(){
    resetState();
    questionEL.innerHTML = `Your score is ${score} out of ${questions.length}!`
    nextEL.innerHTML = 'Play Again';
    nextEL.style.display = 'block';
    
}


//this function calls the next question or showscore function at the end of the last question
function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
       
    }

}


nextEL.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
        timer += 5; 
    }else{
        startQuiz();
        
    }
})

startQuiz()