// techniques.js - Timers para exercícios
let breathInterval;
let pomoInterval;
let stretchInterval;
let breathAnimationId;

document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer-display');
    const startBreath = document.getElementById('start-breath');
    const pauseBreath = document.getElementById('pause-breath');
    const resetBreath = document.getElementById('reset-breath');
    const canvas = document.getElementById('breath-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;

    const pomoTimer = document.getElementById('pomodoro-timer');
    const startPomo = document.getElementById('start-pomo');
    const pausePomo = document.getElementById('pause-pomo');
    const resetPomo = document.getElementById('reset-pomo');

    // Respiração 4-7-8
    let breathCycle = 0;
    let breathPhase = 0; // 0: inspire, 1: segure, 2: expire
    let breathTime = 0;
    let animationRadius = 50;

    function drawBreathCircle(radius) {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(100, 100, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 123, 255, 0.3)';
        ctx.fill();
        ctx.strokeStyle = 'var(--primary)';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    function updateBreath() {
        const phases = ['Inspire', 'Segure', 'Expire'];
        const times = [4, 7, 8];
        timerDisplay.textContent = `${phases[breathPhase]}: ${times[breathPhase] - breathTime}s`;
        breathTime++;
        // Animate circle
        if (breathPhase === 0) { // Inspire
            animationRadius = 50 + (breathTime / 4) * 30;
        } else if (breathPhase === 1) { // Segure
            animationRadius = 80;
        } else { // Expire
            animationRadius = 80 - (breathTime / 8) * 30;
        }
        drawBreathCircle(animationRadius);
        if (breathTime >= times[breathPhase]) {
            breathTime = 0;
            breathPhase++;
            if (breathPhase > 2) {
                breathPhase = 0;
                breathCycle++;
                if (breathCycle >= 4) {
                    clearInterval(breathInterval);
                    timerDisplay.textContent = 'Concluído!';
                    drawBreathCircle(50);
                    return;
                }
            }
        }
    }

    startBreath.addEventListener('click', () => {
        if (breathInterval) return;
        breathInterval = setInterval(updateBreath, 1000);
        // Play sound (simple beep)
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Inspire');
            window.speechSynthesis.speak(utterance);
        }
    });

    pauseBreath.addEventListener('click', () => {
        clearInterval(breathInterval);
        breathInterval = null;
    });

    resetBreath.addEventListener('click', () => {
        clearInterval(breathInterval);
        breathInterval = null;
        breathCycle = 0;
        breathPhase = 0;
        breathTime = 0;
        animationRadius = 50;
        timerDisplay.textContent = 'Pronto para começar';
        drawBreathCircle(50);
    });

    // Initial draw
    drawBreathCircle(50);

    // Pomodoro
    let pomoTime = 25 * 60; // 25 min
    let isWork = true;

    function updatePomo() {
        const min = Math.floor(pomoTime / 60);
        const sec = pomoTime % 60;
        pomoTimer.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
        pomoTime--;
        if (pomoTime < 0) {
            clearInterval(pomoInterval);
            pomoInterval = null;
            if (isWork) {
                pomoTime = 5 * 60;
                isWork = false;
                UI.showToast('Hora da pausa!');
            } else {
                pomoTime = 25 * 60;
                isWork = true;
                UI.showToast('Hora de trabalhar!');
            }
        }
    }

    startPomo.addEventListener('click', () => {
        if (pomoInterval) return;
        pomoInterval = setInterval(updatePomo, 1000);
    });

    pausePomo.addEventListener('click', () => {
        clearInterval(pomoInterval);
        pomoInterval = null;
    });

    resetPomo.addEventListener('click', () => {
        clearInterval(pomoInterval);
        pomoInterval = null;
        pomoTime = 25 * 60;
        isWork = true;
        pomoTimer.textContent = '25:00';
    });

    // Alongamentos - timer simples
    document.querySelectorAll('.stretch-card button').forEach(btn => {
        btn.addEventListener('click', () => {
            let time = 60;
            const display = btn.previousElementSibling;
            stretchInterval = setInterval(() => {
                display.textContent = `Restam ${time}s`;
                time--;
                if (time < 0) {
                    clearInterval(stretchInterval);
                    display.textContent = 'Concluído!';
                }
            }, 1000);
        });
    });

    // Modo calmo
    document.getElementById('calm-mode').addEventListener('click', () => {
        document.body.classList.toggle('calm');
    });

    // Diário Guiado
    const gratitudeBtn = document.getElementById('gratitude-btn');
    const reflectionBtn = document.getElementById('reflection-btn');
    const journalOutput = document.getElementById('journal-output');

    if (gratitudeBtn) {
        gratitudeBtn.addEventListener('click', () => {
            journalOutput.innerHTML = `
                <h3>Exercício de Gratidão</h3>
                <p>Registre 3 coisas pelas quais você é grato hoje:</p>
                <ol>
                    <li><input type="text" placeholder="1."></li>
                    <li><input type="text" placeholder="2."></li>
                    <li><input type="text" placeholder="3."></li>
                </ol>
                <button class="btn" onclick="saveGratitude()">Salvar</button>
            `;
        });
    }

    if (reflectionBtn) {
        reflectionBtn.addEventListener('click', () => {
            journalOutput.innerHTML = `
                <h3>Reflexão Diária</h3>
                <p>O que me deixou feliz hoje?</p>
                <textarea rows="2" placeholder="Descreva..."></textarea>
                <p>O que me estressou hoje?</p>
                <textarea rows="2" placeholder="Descreva..."></textarea>
                <button class="btn" onclick="saveReflection()">Salvar</button>
            `;
        });
    }

    window.saveGratitude = () => {
        const items = Array.from(journalOutput.querySelectorAll('input')).map(i => i.value).filter(v => v);
        if (items.length) {
            Storage.push('gratitude', { date: new Date().toISOString().split('T')[0], items });
            UI.showToast('Gratidão salva!');
            journalOutput.innerHTML = '';
        }
    };

    window.saveReflection = () => {
        const happy = journalOutput.querySelectorAll('textarea')[0].value;
        const stress = journalOutput.querySelectorAll('textarea')[1].value;
        if (happy || stress) {
            Storage.push('reflection', { date: new Date().toISOString().split('T')[0], happy, stress });
            UI.showToast('Reflexão salva!');
            journalOutput.innerHTML = '';
        }
    };

    // Mini-Meditação
    let meditationInterval;
    let meditationTime = 120; // 2 minutes
    const meditationTimer = document.getElementById('meditation-timer');
    const startMeditation = document.getElementById('start-meditation');
    const meditationInstructions = document.getElementById('meditation-instructions');

    const meditationSteps = [
        "Sente-se confortavelmente e feche os olhos.",
        "Respire profundamente pelo nariz.",
        "Expire lentamente pela boca.",
        "Concentre-se na respiração.",
        "Deixe os pensamentos passarem como nuvens.",
        "Mantenha a atenção no momento presente.",
        "Quando terminar, abra os olhos lentamente."
    ];

    if (startMeditation) {
        startMeditation.addEventListener('click', () => {
            if (meditationInterval) return;
            meditationTime = 120;
            let stepIndex = 0;
            meditationInstructions.textContent = meditationSteps[stepIndex];
            meditationInterval = setInterval(() => {
                meditationTime--;
                const min = Math.floor(meditationTime / 60);
                const sec = meditationTime % 60;
                meditationTimer.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
                if (meditationTime % 20 === 0 && stepIndex < meditationSteps.length - 1) {
                    stepIndex++;
                    meditationInstructions.textContent = meditationSteps[stepIndex];
                }
                if (meditationTime <= 0) {
                    clearInterval(meditationInterval);
                    meditationInterval = null;
                    meditationTimer.textContent = 'Concluído!';
                    meditationInstructions.textContent = 'Parabéns! Você completou a meditação.';
                }
            }, 1000);
        });
    }

    // Sound Player
    window.toggleSound = (type) => {
        const audio = document.getElementById(`${type}-audio`);
        const volume = document.getElementById(`${type}-volume`);
        if (audio.paused) {
            audio.volume = volume.value;
            audio.play();
        } else {
            audio.pause();
        }
    };

    // Volume controls
    document.querySelectorAll('input[type="range"]').forEach(input => {
        input.addEventListener('input', (e) => {
            const audioId = e.target.id.replace('-volume', '-audio');
            const audio = document.getElementById(audioId);
            if (audio) audio.volume = e.target.value;
        });
    });
});
