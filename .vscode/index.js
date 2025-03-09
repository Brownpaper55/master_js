const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
    { question: "Which is the largest planet?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
    { question: "Which is the largest Mountain in the world?", options: ["Everest", "kilimanjaro", "Godwin-Austen", "Kangchenjunga"], answer: "Everest" }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 5;
let timer;

const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");

function startQuiz() {
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert(`Quiz Over! Your final score: ${score}`);
        resetQuiz();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    resetTimer();
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score += 10;
        timeLeft += Math.max(0, timeLeft); // Carry over remaining time
    } else {
        score -= 5;
    }
    scoreEl.textContent = score;
    nextQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerEl.textContent = timeLeft;
    startTimer();
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreEl.textContent = score;
    timeLeft = 30;
    startQuiz();
}

startQuiz();
