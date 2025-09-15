// chart.js - Gráfico semanal em canvas
function renderWeeklyMood(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Limpar
    ctx.clearRect(0, 0, width, height);

    // Dados: array de 7 valores (1-5), null para dias sem dados
    const days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
    const barWidth = (width - 20) / 7 - 5;
    const maxHeight = height - 40;

    ctx.fillStyle = 'var(--text-med)';
    ctx.font = '12px Inter';
    days.forEach((day, i) => {
        const x = 10 + i * (barWidth + 5) + barWidth / 2;
        ctx.textAlign = 'center';
        ctx.fillText(day, x, height - 10);
    });

    data.forEach((val, i) => {
        if (val === null || val === undefined) return;
        const x = 10 + i * (barWidth + 5);
        const barHeight = (val / 5) * maxHeight;
        const y = height - 30 - barHeight;
        ctx.fillStyle = 'var(--primary)';
        ctx.fillRect(x, y, barWidth, barHeight);
        // Valor no topo
        ctx.fillStyle = 'var(--text-high)';
        ctx.textAlign = 'center';
        ctx.fillText(val, x + barWidth / 2, y - 5);
    });

    // Eixos
    ctx.strokeStyle = 'var(--stroke)';
    ctx.beginPath();
    ctx.moveTo(0, height - 30);
    ctx.lineTo(width, height - 30);
    ctx.stroke();
}

function renderMonthlyMood(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Limpar
    ctx.clearRect(0, 0, width, height);

    // Dados: array de 30 valores
    const barWidth = (width - 20) / 30 - 2;
    const maxHeight = height - 40;

    data.forEach((val, i) => {
        if (val === null || val === undefined) return;
        const x = 10 + i * (barWidth + 2);
        const barHeight = (val / 5) * maxHeight;
        const y = height - 30 - barHeight;
        ctx.fillStyle = 'var(--secondary)';
        ctx.fillRect(x, y, barWidth, barHeight);
    });

    // Eixos
    ctx.strokeStyle = 'var(--stroke)';
    ctx.beginPath();
    ctx.moveTo(0, height - 30);
    ctx.lineTo(width, height - 30);
    ctx.stroke();
}

// Chamada na página de resultados
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('mood-chart')) {
        const moodData = Storage.get('mood') || [];
        // Agrupar por semana (últimos 7 dias)
        const today = new Date();
        const weekData = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const entry = moodData.find(m => m.date === dateStr);
            weekData.push(entry ? entry.score : null);
        }
        renderWeeklyMood('mood-chart', weekData);
    }
    if (document.getElementById('monthly-chart')) {
        const moodData = Storage.get('mood') || [];
        // Últimos 30 dias
        const today = new Date();
        const monthData = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const entry = moodData.find(m => m.date === dateStr);
            monthData.push(entry ? entry.score : null);
        }
        renderMonthlyMood('monthly-chart', monthData);
    }
});
