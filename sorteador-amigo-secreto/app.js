// Array para armazenar os nomes dos amigos
let amigos = [];

function adicionarAmigo() {
    // Captura o valor do campo de texto
    const inputAmigo = document.getElementById('amigo');
    let nome = inputAmigo.value.trim();

    // Validação: Verifica se o campo está vazio
    if (nome === '') {
        alert('Por favor, insira um nome.');
        return;
    }

    // ✅ Validação: Nome com pelo menos 3 caracteres
    if (nome.length < 3) {
        alert('O nome deve ter pelo menos 3 caracteres.');
        return;
    }

    // ✅ Validação: Bloquear números e símbolos
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!regex.test(nome)) {
        alert('Por favor, insira um nome válido (somente letras e espaços).');
        return;
    }

    // ✅ Formatar nome e sobrenome com a primeira letra maiúscula
    nome = nome
        .split(' ')
        .map(parte => parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase())
        .join(' ');

    // ✅ Impedir nomes duplicados
    if (amigos.includes(nome)) {
        alert('Este nome já foi adicionado!');
        return;
    }

    // ✅ Limitar a quantidade de nomes
    if (amigos.length >= 20) {
        alert('Limite de 20 amigos atingido!');
        return;
    }

    // Adiciona o nome ao array
    amigos.push(nome);

    // ✅ Ordenar lista em ordem alfabética
    amigos.sort();

    // Atualiza a lista na tela
    atualizarListaAmigos();

    // Limpa o campo de entrada
    inputAmigo.value = '';
}

function atualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';

    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;

        // ✅ Adiciona botão de remover com classe para estilizar
        const btnRemover = document.createElement('button');
        btnRemover.textContent = '❌';
        btnRemover.classList.add('remover');
        btnRemover.onclick = () => {
            amigos.splice(index, 1);
            atualizarListaAmigos();
        };

        li.appendChild(btnRemover);
        listaAmigos.appendChild(li);
    });
}


function sortearAmigo() {
    // ✅ Verifica se há amigos na lista
    if (amigos.length === 0) {
        alert('Adicione pelo menos um amigo antes de sortear!');
        return;
    }

    const resultado = document.getElementById('resultado');
    
    // ✅ Animação no sorteio
    resultado.innerHTML = '🎯 Rolando…';

    setTimeout(() => {
        // Gera um índice aleatório baseado no tamanho do array
        const indiceSorteado = Math.floor(Math.random() * amigos.length);

        // Obtém o nome sorteado
        const amigoSorteado = amigos[indiceSorteado];

        // Exibe o resultado na tela
        resultado.innerHTML = `🎉 Amigo sorteado: <strong>${amigoSorteado}</strong>`;
    }, 1000);
}

// ✅ CAPTURA O EVENTO DO "ENTER" NO INPUT
document.getElementById('amigo').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
});
