function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const quizID = getQueryParam("id");
const allQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
const quiz = allQuizzes.find(q => q.id === quizID);

let currentIndex = 0;
let score = 0;

function showQuestion() {
  const container = document.getElementById("quizContainer");
  container.innerHTML = "";

  if (!quiz) {
    container.innerText = "Quiz not found :(";
    return;
  }

  if (currentIndex >= quiz.questions.length) {
    container.innerHTML = `<h2>Finished!</h2><p>You got ${score} of ${quiz.questions.length} correct.</p>`;
    return;
  }

  const q = quiz.questions[currentIndex];
  const options = [q.correctAnswer, ...q.wrongAnswers].sort(() => 0.5 - Math.random());

  const questionHTML = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = quiz.title;
  const questionText = document.createElement("p");
  questionText.textContent = q.text;
  questionHTML.appendChild(title);
  questionHTML.appendChild(questionText);

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => answer(opt);
    questionHTML.appendChild(btn);
    questionHTML.appendChild(document.createElement("br"));
  });

  container.appendChild(questionHTML);
}

function answer(selected) {
  const q = quiz.questions[currentIndex];
  if (selected === q.correctAnswer) {
    score++;
  }
  currentIndex++;
  showQuestion();
}

showQuestion();
