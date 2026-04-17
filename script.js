const questions = [
  {
    question: "რომელ წელს დაკარგა საქართველოს ეკლესიამ ავტოკეფალია?",
    answers: [
      { text: "2008", correct: false },
      { text: "1811", correct: true },
      { text: "1121", correct: false },
      { text: "1453", correct: false }
    ]
  },
  {
    question: "რა ერქვა შავიზღვისპირეთში ჩამოყალიბებულ ქართულ სამეფოს, რომელსაც არგონავტების ლეგენდაც უკავშირდება??",
    answers: [
      { text: "დიაოხი", correct: false },
      { text: "კოლხა", correct: true },
      { text: "ასურეთი", correct: false },
      { text: "ვანი", correct: false }
    ]
  },
  {
    question: "რომელ მეფეს უკავშირდება თბილისის დაარსება??",
    answers: [
      { text: "თამარ მეფეს", correct: false },
      { text: "გიორგი III-ს ", correct: false },
      { text: "ვახტანგ გორგასალს", correct: true },
      { text: "დავით აღმაშენებელს", correct: false }
    ]
  },
  {
    question: "ვინ იყო გაერთიანებული საქართველოს პირველი მეფე?",
    answers: [
      { text: "ბაგრატ III", correct: true },
      { text: "ფარნავაზ მეფე", correct: false },
      { text: "ვახტანგ გორგასალი", correct: false },
      { text: "ლაშა-გიორგი", correct: false }
    ]
  },
  {
    question: "როდის დაიწყო დიდი თურქობა საქართველოში?",
    answers: [
      { text: "735 წელს", correct: false },
      { text: "1080 წელს", correct: true },
      { text: "1089 წელს", correct: false },
      { text: "1008 წელს", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

// shuffle ფუნქცია
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// DOM ელემენტები
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.querySelector(".progress");

// quiz დაწყება
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  shuffleArray(questions);
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;

  // answers shuffle
  shuffleArray(currentQuestion.answers);

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer");

    if (answer.correct) {
      button.dataset.correct = true;
    }

    button.addEventListener("click", selectAnswer);
    answersEl.appendChild(button);
  });

  updateProgress();
}

function resetState() {
  nextBtn.style.display = "none";
  answersEl.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";

  if (correct) {
    selectedBtn.style.backgroundColor = "green";
    score++;
  } else {
    selectedBtn.style.backgroundColor = "red";
  }

  Array.from(answersEl.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "green";
    }
    button.disabled = true;
  });

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.innerText = `შენი ქულა: ${score} / ${questions.length}`;
  answersEl.innerHTML = "";
  nextBtn.innerText = "ახლიდან";
  nextBtn.style.display = "block";

  nextBtn.onclick = () => {
    nextBtn.innerText = "Next";
    startQuiz();
  };
}

// progress bar
function updateProgress() {
  let progressPercent = ((currentQuestionIndex) / questions.length) * 100;
  progressEl.style.width = progressPercent + "%";
}

// start
startQuiz();