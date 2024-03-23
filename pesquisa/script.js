// Função para pesquisar empresas e recursos
function pesquisar() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const empresasDiv = document.getElementById('empresas');
    const recursosDiv = document.getElementById('recursos');

    // Verifica se alguma checklist está selecionada
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let algumaSelecionada = false;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            algumaSelecionada = true;
        }
    });

    // Se alguma estiver selecionada, redireciona para resultado.html no diretório especificado
    if (algumaSelecionada) {
        window.location.href = '../resultado/resultado.html'; // Encerra a execução da função
    }
    
    // Limpa as listas
    empresasDiv.innerHTML = '';
    recursosDiv.innerHTML = '';
    
    // Função para criar checkbox e adicionar ao div especificado
    function createCheckbox(container, item) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = item.nome;
        checkbox.value = item.id; // Supondo que cada empresa/recurso tenha um campo 'id' no banco de dados
        const label = document.createElement('label');
        label.textContent = item.nome;
        const br = document.createElement('br');

        // Adiciona evento de clique ao label para marcar/desmarcar o checkbox correspondente
        label.addEventListener('click', function(event) {
            checkbox.checked = !checkbox.checked;
            if (checkbox.checked) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
            event.stopPropagation(); // Evita que o evento de clique no label seja propagado para o checkbox
        });

        // Adiciona evento de clique ao checkbox para marcar/desmarcar o label correspondente
        checkbox.addEventListener('click', function() {
            if (checkbox.checked) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });

        container.appendChild(checkbox);
        container.appendChild(label);
        container.appendChild(br);
    }

    // Buscar e preencher as colunas de acordo com a pesquisa
    fetch('http://localhost:3000/empresas')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar empresas');
        }
        return response.json();
    })
    .then(data => {
        console.log('Empresas encontradas:', data);
        const empresasFiltered = data.filter(empresa => empresa.nome.toLowerCase().includes(input));
        if (empresasFiltered.length === 0) {
            empresasDiv.textContent = 'Nenhuma empresa encontrada!';
        } else {
            empresasFiltered.forEach(empresa => {
                createCheckbox(empresasDiv, empresa);
            });
        }
    })
    .catch(error => {
        console.error('Erro ao buscar empresas:', error);
    });

    fetch('http://localhost:3000/recursos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar recursos');
        }
        return response.json();
    })
    .then(data => {
        console.log('Recursos encontrados:', data);
        const recursosFiltered = data.filter(recurso => recurso.nome.toLowerCase().includes(input));
        if (recursosFiltered.length === 0) {
            recursosDiv.textContent = 'Nenhum recurso encontrado!';
        } else {
            recursosFiltered.forEach(recurso => {
                createCheckbox(recursosDiv, recurso);
            });
        }
    })
    .catch(error => {
        console.error('Erro ao buscar recursos:', error);
    });
}

// Adiciona evento de teclado ao campo de entrada
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que o formulário seja enviado (caso esteja dentro de um formulário)
        pesquisar(); // Chama a função de pesquisa
    }
});

// Chama a função de pesquisa ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    pesquisar();
});
