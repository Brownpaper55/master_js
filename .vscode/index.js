const questions = [
    { question: "What is open-source software?", options: ["Paid software", "Software with free access to source code", "Software owned by a company", "A type of virus"], answer: "Software with free access to source code" },
    { question: "What is the sum of 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is the default file extension for a JavaScript file?", options: [".js", ".java", ".py", ".html"], answer: ".js" },
    { question: "Which company created the Windows operating system?", options: ["Apple", "Google", "Microsoft", "IBM"], answer: "Microsoft" },
    { question: "What is the purpose of RAM in a computer?", options: ["Long-term storage", "Temporary memory for running applications", "Processing power", "Graphics rendering"], answer: "Temporary memory for running applications" },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
    { question: "Which is the largest planet?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
    { question: "Which is the largest Mountain in the world?", options: ["Everest", "kilimanjaro", "Godwin-Austen", "Kangchenjunga"], answer: "Everest" }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
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
        showAlert(`Quiz Over! Your final score: ${score}`);
        return; // Stop further execution
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
    clearInterval(timer); // Clear any existing interval
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer); // Clear the interval when time is up
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    startTimer();
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showAlert(message) {
    clearInterval(timer); // Clear the timer
    document.getElementById("alert-message").textContent = message;
    document.getElementById("alert").style.display = "block";
}

function closeAlert() {
    document.getElementById("alert").style.display = "none";
    resetQuiz(); // Restart the quiz when the alert is closed
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreEl.textContent = score;
    timeLeft = 10; // Reset time to 10 seconds
    startQuiz();
}

startQuiz();
