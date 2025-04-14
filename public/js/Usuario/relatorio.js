document.addEventListener('DOMContentLoaded', function () {
    const botaoPesquisar = document.getElementById('pesquisarBtn');

    botaoPesquisar.addEventListener('click', function () {
        let idUsuario = document.getElementById("usuario").value;
        let dataInicio = document.getElementById("dia").value;
        let dataFim = document.getElementById("dia2").value;

        if (idUsuario && dataInicio && dataFim) {
            let apiUrl = 'http://152.67.45.250/usuarios/relatorios?id=' + idUsuario + '&dia=' + dataInicio + '&dia2=' + dataFim;

            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // ✅ garante que os cookies (userId, Nome) sejam enviados
            })
            .then(function(resposta) {
                if (!resposta.ok) {
                    throw new Error('Erro na resposta: ' + resposta.status);
                }
                return resposta.json();
            })
            .then(function(resposta) {
                if (resposta.ok) {
                    atualizarRelatorio(resposta);
                } else {
                    alert(resposta.msg || 'Erro ao gerar relatório.');
                }
            })
            .catch(function(erro) {
                console.error("Erro ao buscar relatório:", erro);
                alert('Erro ao buscar relatório.');
            });

        } else {
            alert("Por favor, preencha todas as informações de pesquisa.");
        }
    });

    function atualizarRelatorio(dados) {
        const lista = document.getElementById('listaCidadesVisitadas');
        lista.innerHTML = '';
        dados.cidadesVisitadas.forEach(cidade => {
            const li = document.createElement('li');
            li.textContent = cidade;
            lista.appendChild(li);
        });

        document.getElementById('totalKm').textContent = dados.totalKm;
    }
});
