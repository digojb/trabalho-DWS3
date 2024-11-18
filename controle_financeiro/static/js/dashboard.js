// Função para criar um novo usuário ao submeter o formulário
async function createUser(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const username = document.getElementById('username').value;
    const senha = document.getElementById('senha').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const data = {
        username: username,
        senha: senha,
        nome: nome,
        email: email
    };

    try {
        const response = await fetch('http://34.228.242.3:5000/usuarios', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer PtHZxbFsamXi9mRzPjs49GjGSFYePAe3',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar o usuário');
        }

        const result = await response.json();
        console.log('Usuário criado com sucesso:', result);
        await fetchUsers();  // Recarrega a lista de usuários

        // Fechar o modal após sucesso
        const modal = bootstrap.Modal.getInstance(document.getElementById('createUserModal'));
        modal.hide();
    } catch (error) {
        console.error('Erro ao criar o usuário:', error);
    }
}

// Função para carregar os usuários na tabela
async function fetchUsers() {

    try {
        const response = await fetch('http://34.228.242.3:5000/usuarios', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer PtHZxbFsamXi9mRzPjs49GjGSFYePAe3',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar os usuários');
        }

        const users = await response.json();
        const tableBody = document.getElementById('user-table');
        tableBody.innerHTML = '';  // Limpa a tabela antes de adicionar os novos usuários

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Remover</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar os usuários:', error);
    }
}

// Função para excluir um usuário
async function deleteUser(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
            const response = await fetch(`http://34.228.242.3:5000/usuarios?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer PtHZxbFsamXi9mRzPjs49GjGSFYePAe3',
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Erro ao remover dados');
            }
    
            const result = await response.json();
            console.log('Dados removidos com sucesso:', result);
            await fetchUsers();  // Recarrega a lista de usuários
        } catch (error) {
            console.error('Erro ao remover dados:', error);
        }
    }
}

// Função para editar um usuário e preencher os campos do modal
async function editUser(id) {
    try {

        // Buscar o usuário pelo id
        const response = await fetch(`http://34.228.242.3:5000/usuarios?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer PtHZxbFsamXi9mRzPjs49GjGSFYePAe3',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar os dados do usuário');
        }

        const user = await response.json();

        // Preencher os campos do modal com os dados do usuário
        document.getElementById('edit-user-id').value = user.id;
        document.getElementById('edit-username').value = user.username;
        document.getElementById('edit-senha').value = user.senha

        // Exibir o modal de edição
        const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
        modal.show();
    } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
    }
}

// Função para atualizar um usuário
async function updateUser(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const id = document.getElementById('edit-user-id').value;
    const username = document.getElementById('edit-username').value;
    const senha = document.getElementById('edit-senha').value;

    const data = {
        id : id,
        username: username,
        senha: senha,
    };

    try {
        const response = await fetch(`http://34.228.242.3:5000/usuarios?id=${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer PtHZxbFsamXi9mRzPjs49GjGSFYePAe3',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            alert('Usuário atualizado com sucesso!');
            fetchUsers();  // Recarrega a lista de usuários
            const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
            modal.hide(); // Fecha o modal de edição
        } else {
            alert('Erro ao atualizar o usuário: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
    }
}

// Iniciar a página
fetchUsers();

// Chama a função para carregar os usuários assim que a página for carregada
document.addEventListener('DOMContentLoaded', fetchUsers);
document.getElementById('submit-create-user').addEventListener('click', createUser);
document.getElementById('submit-edit-user').addEventListener('click', updateUser);

