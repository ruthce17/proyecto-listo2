document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const assunto = document.getElementById('assunto').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !assunto || !mensagem) {
        document.getElementById('responseMessage').innerText = 'Todos os campos são obrigatórios!';
        return;
    }

    if (!validateEmail(email)) {
        document.getElementById('responseMessage').innerText = 'Email inválido!';
        return;
    }


    document.getElementById('responseMessage').innerText = 'Mensagem enviada com sucesso!';
    console.log('Dados do formulário:', { nome, email, assunto, mensagem });

    document.getElementById('contactForm').reset();


    fetch('https://api.github.com/users/ruthce17/repos') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json();
        })
        .then(repos => {
            const repoList = document.getElementById('repoList');
            repoList.innerHTML = '';

            if (repos.length > 0) {
                repoList.innerHTML = '<h2>Repositórios no GitHub:</h2>';
                const list = document.createElement('ul');
                repos.forEach(repo => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                    list.appendChild(listItem);
                });
                repoList.appendChild(list);
            } else {
                repoList.innerHTML = '<p>Nenhum repositório encontrado.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar repositórios:', error);
            document.getElementById('responseMessage').innerText = 'Erro ao buscar repositórios!';
        });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
