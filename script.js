const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
    answer: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["Python Script", "React", "Angular", "Vue"],
    answer: 0
  },
  {
    question: "Which is used for Connect To Database?",
    options: ["PHP", "HTML", "JS", "All"],
    answer: 0
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const timeEl = document.getElementById("time");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timeEl.textContent = timeLeft;
  timer = setInterval(updateTimer, 1000);

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  q.options.forEach((opt, index) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.onclick = () => checkAnswer(index);
    optionsEl.appendChild(li);
  });
}

function updateTimer() {
  timeLeft--;
  timeEl.textContent = timeLeft;
  if (timeLeft === 0) {
    clearInterval(timer);
    feedbackEl.textContent = "Time's up!";
    disableOptions();
  }
}

function checkAnswer(selected) {
  clearInterval(timer);
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = `Wrong! Correct answer: ${questions[currentQuestion].options[correct]}`;
    feedbackEl.style.color = "red";
  }
  disableOptions();
}

function disableOptions() {
  const items = optionsEl.querySelectorAll("li");
  items.forEach(item => item.style.pointerEvents = "none");
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = score;
  totalEl.textContent = questions.length;
}

loadQuestion();
