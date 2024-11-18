document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evita o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Envia o login para a API
    const response = await fetch('http://34.228.242.3:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            senha: password
        })
    });

    // Checa a resposta da API
    const data = await response.json();  // Aguarda a resposta em formato JSON

    if (data.autorizado) {
        // Se autorizado for true, redireciona para a próxima página (dashboard, por exemplo)
        window.location.href = '/dashboard';  // Substitua '/dashboard' pelo URL da página desejada
    } else {
        // Caso a autenticação falhe
        alert('Usuário ou senha inválidos!');
    }
});
