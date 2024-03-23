const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    if (username.trim() === '' || password.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (username === 'admin' && password === '123456') {
        window.location.href = '../pesquisa/index.html';
    } else {
        alert('Usuário ou senha inválidos.');
    }
});
