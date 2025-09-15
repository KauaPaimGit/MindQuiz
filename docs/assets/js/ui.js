// ui.js - Helpers de UI: Toast, Modal, etc.
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
}

function showModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            ${content}
            <button onclick="this.parentElement.parentElement.remove()">Fechar</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('button').focus();
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
}

// Accordion simples
function initAccordion(selector) {
    const items = document.querySelectorAll(selector);
    items.forEach(item => {
        const header = item.querySelector('button');
        const content = item.querySelector('.accordion-content');
        header.addEventListener('click', () => {
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
}

// Tabs
function initTabs(container) {
    const tabs = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.tab-content');
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.style.display = 'none');
            tab.classList.add('active');
            contents[index].style.display = 'block';
        });
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case '1':
                e.preventDefault();
                window.location.href = 'index.html';
                break;
            case '2':
                e.preventDefault();
                window.location.href = 'diario.html';
                break;
            case '3':
                e.preventDefault();
                window.location.href = 'quiz.html';
                break;
            case '4':
                e.preventDefault();
                window.location.href = 'tecnicas.html';
                break;
            case '5':
                e.preventDefault();
                window.location.href = 'resultados.html';
                break;
            case '6':
                e.preventDefault();
                window.location.href = 'config.html';
                break;
        }
    } else {
        // Single key shortcuts
        switch (e.key) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
                if (document.getElementById('mood-score')) {
                    e.preventDefault();
                    document.getElementById('mood-score').value = e.key;
                    document.getElementById('mood-score').dispatchEvent(new Event('input'));
                }
                break;
            case 'n':
                if (document.getElementById('note')) {
                    e.preventDefault();
                    document.getElementById('note').focus();
                }
                break;
            case 'q':
                if (document.getElementById('quiz-container')) {
                    e.preventDefault();
                    window.location.href = 'quiz.html';
                }
                break;
            case 'r':
                if ('speechSynthesis' in window) {
                    e.preventDefault();
                    const text = window.getSelection().toString() || document.body.innerText;
                    const utterance = new SpeechSynthesisUtterance(text);
                    window.speechSynthesis.speak(utterance);
                }
                break;
        }
    }
});

// Exportar
window.UI = { showToast, showModal, formatDate, initAccordion, initTabs };
