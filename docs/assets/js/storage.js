// storage.js - Wrapper para localStorage com namespace
const NAMESPACE = 'mindquiz_';

function get(key) {
    try {
        const item = localStorage.getItem(NAMESPACE + key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Erro ao ler do localStorage:', e);
        return null;
    }
}

function set(key, value) {
    try {
        localStorage.setItem(NAMESPACE + key, JSON.stringify(value));
    } catch (e) {
        console.error('Erro ao salvar no localStorage:', e);
    }
}

function push(key, item) {
    const arr = get(key) || [];
    arr.push(item);
    set(key, arr);
}

function getByDate(key, date) {
    const data = get(key) || [];
    return data.find(item => item.date === date);
}

// Exportar para uso global
window.Storage = { get, set, push, getByDate };
