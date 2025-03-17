const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");
const nextBtn = document.getElementById("next-btn");
const quizResult = document.getElementById("quiz-result");
const retakeBtn = document.getElementById("retake-btn");
const timerElement = document.getElementById("time"); // Timer display

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10; // Time per question

const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false },
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false },
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Ag", correct: false },
            { text: "Au", correct: true },
            { text: "Pb", correct: false },
        ]
    }
];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.classList.add("none-display"); // Hide next button
    quizResult.classList.add("none-display"); // Hide results section
    showQuestion();
}

function showQuestion() {
    clearInterval(timer); // Reset timer
    timeLeft = 10; // Reset time
    updateTimerDisplay();
    startTimer();

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;

    // Clear previous answers
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => checkAnswer(button, answer.correct));
        answersContainer.appendChild(button);
    });

    nextBtn.classList.add("none-display"); // Hide next button until an answer is selected
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft === 0) {
            clearInterval(timer);
            disableButtons();
            nextBtn.classList.remove("none-display");
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerElement.innerHTML = timeLeft;
    timerElement.classList.toggle("danger", timeLeft <= 3);
}

function checkAnswer(button, correct) {
    clearInterval(timer);
    disableButtons();

    if (correct) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("incorrect");
    }

    nextBtn.classList.remove("none-display"); // Show next button after selecting an answer
}

function disableButtons() {
    Array.from(answersContainer.children).forEach(button => {
        button.classList.add("disabled");
    });
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionElement.innerHTML = "Quiz Completed!";
        answersContainer.innerHTML = "";
        nextBtn.classList.add("none-display");
        document.getElementById("final-score").innerHTML = `Your Score: ${score}/${questions.length}`;
        quizResult.classList.remove("none-display");
    }
});

retakeBtn.addEventListener("click", startQuiz);

// Start the quiz
startQuiz();
