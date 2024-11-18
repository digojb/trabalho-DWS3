// Função para formatar os valores para o formato monetário
function formatarValor(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// Função para formatar a data no formato brasileiro
function formatarData(data) {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
}

// Função para renderizar os dados financeiros na tabela
function renderizarTabela(dados) {
    const tabela = document.getElementById('finance-table');
    tabela.innerHTML = '';  // Limpa a tabela antes de renderizar os novos dados

    dados.forEach((registro, index) => {
        const tipoFormatado = registro.tipo === 'saida' ? 'Saída' : 'Entrada';

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${index + 1}</td>
            <td>${formatarData(registro.data)}</td>
            <td>${registro.descricao}</td>
            <td>${formatarValor(registro.valor)}</td>
            <td>${tipoFormatado}</td>
            <td>
                <button class="btn btn-primary" onclick="editarRegistro(${registro.id})">Editar</button>
                <button class="btn btn-danger" onclick="removerRegistro(${registro.id})">Remover</button>
            </td>
        `;
        tabela.appendChild(linha);
    });
}

// Função para carregar os dados financeiros da API
async function carregarDadosFinanceiros() {
    try {
        const response = await fetch('http://34.228.242.3:5000/controle_financeiro', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer PtHZxbFsamXi9mRzPjs49GjGSFYePAe3',
                'Content-Type': 'application/json'
            }
        });

        const dados = await response.json();
        renderizarTabela(dados);
    } catch (error) {
        console.error('Erro ao carregar os dados financeiros:', error);
    }
}

// Função para adicionar um novo registro financeiro
async function adicionarRegistro(descricao, valor, tipo, data, id) {
    try {
        const novoRegistro = {
            descricao,
            valor,
            tipo,
            data,
            id
        };

        const response = await fetch('http://34.228.242.3:5000/controle_financeiro', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer PtHZxbFsamXi9mRzPjs49GjGSFYePAe3',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoRegistro)
        });

        if (response.ok) {
            alert('Registro financeiro criado com sucesso!');
            carregarDadosFinanceiros();  // Atualiza a tabela com os dados mais recentes
        } else {
            alert('Erro ao criar o registro financeiro.');
        }
    } catch (error) {
        console.error('Erro ao adicionar o registro financeiro:', error);
    }
}

// Função para remover um registro financeiro
async function removerRegistro(id) {
    try {
        const response = await fetch(`http://34.228.242.3:5000/controle_financeiro?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer PtHZxbFsamXi9mRzPjs49GjGSFYePAe3',
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            alert('Registro financeiro removido com sucesso!');
            carregarDadosFinanceiros();  // Atualiza a tabela após a remoção
        } else {
            alert('Erro ao remover o registro financeiro.');
        }
    } catch (error) {
        console.error('Erro ao remover o registro financeiro:', error);
    }
}

// Função para editar um registro financeiro
async function editarRegistro(id) {
    const descricao = prompt("Informe a nova descrição:");
    const valor = parseFloat(prompt("Informe o novo valor:"));
    const tipo = prompt("Informe o tipo (entrada/saida):");

    if (descricao && valor && tipo) {
        try {
            const response = await fetch(`http://34.228.242.3:5000/controle_financeiro?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer PtHZxbFsamXi9mRzPjs49GjGSFYePAe3',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    descricao,
                    valor,
                    tipo,
                })
            });

            if (response.ok) {
                alert('Registro financeiro atualizado com sucesso!');
                carregarDadosFinanceiros();  // Atualiza a tabela com os dados mais recentes
            } else {
                alert('Erro ao atualizar o registro financeiro.');
            }
        } catch (error) {
            console.error('Erro ao editar o registro financeiro:', error);
        }
    } else {
        alert('Todos os campos são obrigatórios para editar.');
    }
}

// Função para capturar os dados do formulário e adicionar um novo registro
document.getElementById('submit-create-finance').addEventListener('click', function(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('status').value === 'Pago' ? 'entrada' : 'saida';  // Baseado no status
    const data = new Date().toISOString();  // Data e hora atuais
    const usuario_id = 1;  // Id do usuário, ajuste conforme necessário

    if (descricao && valor && tipo) {
        adicionarRegistro(descricao, valor, tipo, data, id);
        document.getElementById('create-finance-form').reset();  // Limpa o formulário
        $('#createFinanceModal').modal('hide');  // Fecha o modal
    } else {
        alert('Preencha todos os campos!');
    }
});

// Chama a função para carregar os dados financeiros ao carregar a página
window.onload = carregarDadosFinanceiros;
