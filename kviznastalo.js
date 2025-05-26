const kviz = {
  "otazky": ["How are you?", "What are you doing right now?", "lingan guli guli"],
  "odpovedi": [
    ["Good", "私は大きなペニスを持っています", "ฉันมีจู๋ใหญ่"],
    ["Nothing", "Everything", "минем зур дик бар"],
    ["wa", "吸吮我的雞巴", "guli guanchan"]
  ],
  "spravneOdpovedi": ["Good", "Everything", "guli guanchan"]
};

let currentQuestion = 0;
let correctAnswers = 0;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');

document.addEventListener('DOMContentLoaded', () => {
  loadQuestion();
});

function loadQuestion() {
  questionEl.textContent = kviz.otazky[currentQuestion];
  answersEl.innerHTML = '';

  kviz.odpovedi[currentQuestion].forEach(answer => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.style.display = 'block';
    btn.style.margin = '10px 0';
    btn.onclick = () => checkAnswer(answer);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = kviz.spravneOdpovedi[currentQuestion];
  if (selected === correct) {
    correctAnswers++;
    alert("Correct!");
  } else {
    alert("Wrong!");
  }

  currentQuestion++;
  if (currentQuestion < kviz.otazky.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionEl.textContent = `Quiz finished! You got ${correctAnswers} out of ${kviz.otazky.length} correct.`;
  answersEl.innerHTML = '';

  // Reset, pokud chceš zkusit znovu
  const retryBtn = document.createElement('button');
  retryBtn.textContent = 'Try again';
  retryBtn.onclick = () => {
    currentQuestion = 0;
    correctAnswers = 0;
    loadQuestion();
  };
  answersEl.appendChild(retryBtn);
}
