// quiz.js - Lógica do quiz
const questions = [
    {
        question: 'Como foi a qualidade do seu sono ontem?',
        options: ['Muito ruim', 'Ruim', 'Regular', 'Boa', 'Excelente'],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: 'Qual o nível de estresse que você sentiu hoje?',
        options: ['Muito alto', 'Alto', 'Médio', 'Baixo', 'Nenhum'],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: 'Como está seu foco hoje?',
        options: ['Muito disperso', 'Disperso', 'Neutro', 'Focado', 'Muito focado'],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: 'Como foi sua interação social hoje?',
        options: ['Muito isolado', 'Isolado', 'Neutro', 'Social', 'Muito social'],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: 'Qual seu nível de energia hoje?',
        options: ['Muito baixo', 'Baixo', 'Neutro', 'Alto', 'Muito alto'],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: 'Como você se sente em relação à sua produtividade hoje?',
        options: ['Muito improdutivo', 'Improdutivo', 'Neutro', 'Produtivo', 'Muito produtivo'],
        scores: [0, 25, 50, 75, 100]
    },
    {
        question: 'Qual sua autopercepção de bem-estar emocional hoje?',
        options: ['Muito ruim', 'Ruim', 'Regular', 'Boa', 'Excelente'],
        scores: [0, 25, 50, 75, 100]
    }
];

let currentQuestion = 0;
let answers = [];
let totalScore = 0;

document.addEventListener('DOMContentLoaded', () => {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const nextBtn = document.getElementById('next-btn');
    const progressEl = document.getElementById('progress');
    const resultEl = document.getElementById('result');
    const scoreEl = document.getElementById('score');
    const feedbackEl = document.getElementById('feedback');

    function renderQuestion() {
        const q = questions[currentQuestion];
        questionEl.textContent = q.question;
        optionsEl.innerHTML = q.options.map((opt, i) => `
            <label><input type="radio" name="option" value="${i}"> ${opt}</label>
        `).join('');
        progressEl.textContent = `${currentQuestion + 1}/${questions.length}`;
        nextBtn.disabled = true;
    }

    optionsEl.addEventListener('change', () => {
        nextBtn.disabled = false;
    });

    nextBtn.addEventListener('click', () => {
        const selected = document.querySelector('input[name="option"]:checked');
        if (!selected) return;
        const idx = parseInt(selected.value);
        answers.push(idx);
        totalScore += questions[currentQuestion].scores[idx];
        currentQuestion++;
        if (currentQuestion < questions.length) {
            renderQuestion();
        } else {
            showResult();
        }
    });

    function showResult() {
        document.getElementById('quiz-container').style.display = 'none';
        resultEl.style.display = 'block';
        scoreEl.textContent = `Pontuação: ${totalScore}`;
        let feedback = 'Você está bem!';
        if (totalScore < 100) feedback = 'Você pode estar sob pressão, experimente respiração 4-7-8.';
        feedbackEl.textContent = feedback;

        // Salvar
        const today = new Date().toISOString().split('T')[0];
        Storage.push('quiz', { date: today, score: totalScore, answers });
    }

    renderQuestion();
});
