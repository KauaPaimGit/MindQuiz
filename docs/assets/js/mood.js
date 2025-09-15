// mood.js - Lógica do diário de humor
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mood-form');
    const scoreInput = document.getElementById('mood-score');
    const desc = document.getElementById('mood-desc');
    const saveBtn = document.getElementById('save-btn');
    const speechBtn = document.getElementById('speech-btn');
    const noteTextarea = document.getElementById('note');

    // Atualizar descrição do score
    scoreInput.addEventListener('input', () => {
        const labels = ['Muito mal', 'Mal', 'Neutro', 'Bem', 'Muito bem'];
        desc.textContent = `${scoreInput.value} - ${labels[scoreInput.value - 1]}`;
    });

    // Verificar se já salvou hoje
    const today = new Date().toISOString().split('T')[0];
    const existing = Storage.getByDate('mood', today);
    if (existing) {
        saveBtn.disabled = true;
        saveBtn.textContent = 'Já salvo hoje';
        // Preencher form com dados existentes
        scoreInput.value = existing.score;
        desc.textContent = `${existing.score} - ${['Muito mal', 'Mal', 'Neutro', 'Bem', 'Muito bem'][existing.score - 1]}`;
        document.querySelectorAll('input[name="tags"]').forEach(cb => {
            if (existing.tags.includes(cb.value)) cb.checked = true;
        });
        document.getElementById('note').value = existing.note || '';
    }

    // Web Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';
        recognition.continuous = false;
        recognition.interimResults = false;

        speechBtn.addEventListener('click', () => {
            recognition.start();
            speechBtn.textContent = '🎙️';
            UI.showToast('Fale sua nota...');
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            noteTextarea.value += (noteTextarea.value ? ' ' : '') + transcript;
            speechBtn.textContent = '🎤';
            UI.showToast('Nota adicionada por voz');
        };

        recognition.onerror = () => {
            speechBtn.textContent = '🎤';
            UI.showToast('Erro no reconhecimento de voz');
        };

        recognition.onend = () => {
            speechBtn.textContent = '🎤';
        };
    } else {
        speechBtn.style.display = 'none';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (saveBtn.disabled) return;

        const score = parseInt(scoreInput.value);
        const tags = Array.from(document.querySelectorAll('input[name="tags"]:checked')).map(cb => cb.value);
        const note = document.getElementById('note').value;

        const entry = { date: today, score, tags, note };
        Storage.push('mood', entry);
        UI.showToast('Humor salvo com sucesso!');
        saveBtn.disabled = true;
        saveBtn.textContent = 'Salvo!';
    });

    // Compartilhar reflexão
    document.getElementById('share-reflection-btn').addEventListener('click', () => {
        const score = parseInt(scoreInput.value);
        const note = document.getElementById('note').value;
        if (!note.trim()) {
            UI.showToast('Adicione uma nota para compartilhar');
            return;
        }
        const emoji = ['😢', '🙁', '😐', '😊', '🤩'][score - 1];
        const text = `Humor hoje: ${emoji}\n\n${note}\n\n#MindQuiz #BemEstar`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    });
});
