# MindQuiz — Saúde Mental Interativa

Um site estático para check-in diário de bem-estar, com diário de humor, quiz rápido, técnicas de relaxamento e gráficos de progresso.

## Funcionalidades

- **Diário de Humor**: Registre seu humor diário com escala 1-5, tags e notas.
- **Quiz Diário**: 5 perguntas objetivas para avaliar seu estado mental.
- **Técnicas**: Respiração 4-7-8, Pomodoro, alongamentos com timers.
- **Resultados**: Gráfico semanal em canvas, linha do tempo e estatísticas.

## Estrutura do Projeto

```
mindquiz/
├── README.md
├── index.html
├── diario.html
├── quiz.html
├── tecnicas.html
├── resultados.html
├── sitemap.xml
├── robots.txt
└── assets/
    ├── css/
    │   ├── tokens.css
    │   └── app.css
    ├── js/
    │   ├── storage.js
    │   ├── mood.js
    │   ├── quiz.js
    │   ├── chart.js
    │   ├── techniques.js
    │   └── ui.js
    └── img/
        ├── logo.svg
        └── icons/
            ├── stretch.svg
            └── ...
```

## Como Editar

### Textos e Perguntas

- Edite os textos diretamente nos arquivos HTML.
- Para perguntas do quiz, modifique o array `questions` em `quiz.js`.
- Tags do diário em `diario.html`.

### Estilos

- Tokens em `tokens.css`: cores, tipografia, espaçamentos.
- Componentes em `app.css`: botões, forms, etc.

### Funcionalidades

- Storage: `storage.js` gerencia localStorage.
- Lógica específica em cada JS correspondente.

## Publicação no GitHub Pages

1. Crie um repositório no GitHub.
2. Faça upload dos arquivos para a branch `main`.
3. Vá para Settings > Pages.
4. Selecione branch `main` e pasta `/mindquiz` (ou root se for a raiz).
5. Acesse a URL gerada.

## Avisos Legais

Este site não substitui atendimento profissional. Em caso de crise:

- CVV: 188
- CAPS: Procure o mais próximo

Dados são armazenados apenas no navegador do usuário.

## ODS 3: Saúde e Bem-Estar

Contribui para o Objetivo de Desenvolvimento Sustentável 3 da ONU. [Saiba mais](https://www.who.int/health-topics/mental-disorders).

## Créditos

- Fontes: Inter e Montserrat (Google Fonts)
- Ícones: SVGs customizados

## Roadmap

- Multilíngue (pt-BR, en, es)
- PWA com manifest e service worker
- Integração com APIs de saúde
- Temas adicionais
