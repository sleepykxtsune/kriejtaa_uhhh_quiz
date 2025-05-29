let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];

function addQuestion() {
  const container = document.getElementById("questionsContainer");
  const html = `
    <div class="question">
      <input type="text" placeholder="Question" class="questionText" />
      <input type="text" placeholder="Correct Answer" class="correctAnswer" />
      <input type="text" placeholder="Wrong Answer 1" class="wrongAnswer1" />
      <input type="text" placeholder="Wrong Answer 2" class="wrongAnswer2" />
      <hr />
    </div>
  `;
  container.insertAdjacentHTML("beforeend", html);
}

function saveQuiz() {
  const title = document.getElementById("quizTitle").value.trim();
  const questions = document.querySelectorAll(".question");

  if (!title) {
    alert("Please enter a quiz title.");
    return;
  }

  const quiz = {
    title: title,
    questions: []
  };

  questions.forEach(q => {
    const text = q.querySelector(".questionText").value.trim();
    const correct = q.querySelector(".correctAnswer").value.trim();
    const wrong1 = q.querySelector(".wrongAnswer1").value.trim();
    const wrong2 = q.querySelector(".wrongAnswer2").value.trim();

    if (text && correct && wrong1 && wrong2) {
      quiz.questions.push({
        text,
        correctAnswer: correct,
        wrongAnswers: [wrong1, wrong2]
      });
    }
  });

  if (quiz.questions.length === 0) {
    alert("Please add at least one complete question.");
    return;
  }

  const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  quizzes.push(quiz);
  localStorage.setItem("quizzes", JSON.stringify(quizzes));

  alert("Quiz saved!");
  document.getElementById("quizTitle").value = "";
  document.getElementById("questionsContainer").innerHTML = "";
  loadQuizzes();
}

function loadQuizzes() {
  const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  const container = document.getElementById("savedQuizzes");
  container.innerHTML = "";

  quizzes.forEach((quiz, index) => {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "10px";

    const btnPlay = document.createElement("button");
    btnPlay.textContent = quiz.title;
    btnPlay.onclick = () => startQuiz(index);

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    btnDelete.style.marginLeft = "10px";
    btnDelete.onclick = () => deleteQuiz(index);

    wrapper.appendChild(btnPlay);
    wrapper.appendChild(btnDelete);
    container.appendChild(wrapper);
  });
}

function deleteQuiz(index) {
  if (confirm("Are you sure you want to delete this quiz?")) {
    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    quizzes.splice(index, 1);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    loadQuizzes();
  }
}

// Spustí hraní kvízu
function startQuiz(index) {
  const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  currentQuiz = quizzes[index];
  currentQuestionIndex = 0;
  userAnswers = [];
  // Skryj tvorbu, zobraz hraní
  document.getElementById("quizCreator").style.display = "none";
  document.getElementById("quizPlayer").style.display = "block";
  showCurrentQuestion();
}

// Zobrazí aktuální otázku
function showCurrentQuestion() {
  const container = document.getElementById("quizPlayer");
  container.innerHTML = "";

  if (!currentQuiz || currentQuestionIndex >= currentQuiz.questions.length) {
    showQuizResult();
    return;
  }

  const q = currentQuiz.questions[currentQuestionIndex];
  const allAnswers = [q.correctAnswer, ...q.wrongAnswers];
  // Zamíchat odpovědi
  const shuffled = allAnswers.sort(() => 0.5 - Math.random());

  container.innerHTML = `
    <h2>${currentQuiz.title}</h2>
    <div>
      <p>${q.text}</p>
      ${shuffled.map(ans => `
        <button class="answer-btn" onclick="selectAnswer('${ans.replace(/'/g, "\\'")}')">${ans}</button>
      `).join("")}
    </div>
    <div style="margin-top:16px;">
      <span>Otázka ${currentQuestionIndex + 1} z ${currentQuiz.questions.length}</span>
    </div>
  `;
}

// Zpracuje odpověď a posune na další otázku
function selectAnswer(answer) {
  userAnswers.push(answer);
  currentQuestionIndex++;
  showCurrentQuestion();
}

// Vyhodnotí výsledek
function showQuizResult() {
  let score = 0;
  currentQuiz.questions.forEach((q, i) => {
    if (userAnswers[i] === q.correctAnswer) score++;
  });

  const container = document.getElementById("quizPlayer");
  container.innerHTML = `
    <h2>Výsledek</h2>
    <p>Správně: ${score} z ${currentQuiz.questions.length}</p>
    <button onclick="endQuiz()">Zpět na výběr kvízu</button>
  `;
}

// Vrátí zpět na tvorbu kvízu
function endQuiz() {
  document.getElementById("quizCreator").style.display = "block";
  document.getElementById("quizPlayer").style.display = "none";
  loadQuizzes();
}

loadQuizzes();
