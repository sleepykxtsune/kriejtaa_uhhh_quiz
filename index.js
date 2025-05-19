
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
      btnPlay.onclick = () => takeQuiz(index);
  
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
  
  function takeQuiz(index) {
    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const quiz = quizzes[index];
    const container = document.getElementById("questionsContainer");
    container.innerHTML = `<h2>${quiz.title}</h2>`;
  
    quiz.questions.forEach((q, i) => {
      const allAnswers = [q.correctAnswer, ...q.wrongAnswers];
      const shuffled = allAnswers.sort(() => 0.5 - Math.random());
  
      container.innerHTML += `
        <div>
          <p>${q.text}</p>
          ${shuffled.map(ans => `
            <label>
              <input type="radio" name="question-${i}" value="${ans}" />
              ${ans}
            </label><br>
          `).join("")}
        </div>
      `;
    });
  
    container.innerHTML += `<button onclick="checkAnswers(${index})">Submit Answers</button>`;
  }
  
  function checkAnswers(index) {
    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const quiz = quizzes[index];
  
    let score = 0;
    quiz.questions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="question-${i}"]:checked`);
      if (selected && selected.value === q.correctAnswer) {
        score++;
      }
    });
  
    alert(`You got ${score} out of ${quiz.questions.length} correct!`);
  }
  
  loadQuizzes();

  
