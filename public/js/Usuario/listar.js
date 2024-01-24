document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("pesquisarBtn").addEventListener("click", pesquisarHoras);

    function pesquisarHoras() {
        let idUsuario = document.getElementById("usuario").value;
        let dataInicio = document.getElementById("dia").value;
        let dataFim = document.getElementById("dia2").value;
    
        // Verifica se as datas são válidas
        if (idUsuario && dataInicio && dataFim) {
            let currentUrl = window.location.href;
            
            // Atualiza a URL para incluir o caminho da rota desejada
            let apiUrl = currentUrl + '/buscar?id=' + idUsuario + '&dia=' + dataInicio + '&dia2=' + dataFim;
    
            fetch(apiUrl, {
                method: 'GET',  // Assumindo que a rota usa o método GET para pesquisa
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(resposta) {
                if (resposta.ok) {
                    // Atualiza a tabela com os resultados da busca
                    atualizarTabela(resposta.resultados);
                } else {
                    alert(resposta.msg);
                }
            })
            .catch(function(erro) {
                console.error("Erro ao buscar horas:", erro);
            });
    
        } else {
            alert("Por favor, preencha todas as informações de pesquisa.");
        }
    }
    //FORMATA DATA NO CORRETO
    function formatarDataISO8601ParaDDMMYYYY(dataISO8601) {
        const dataObj = new Date(dataISO8601);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    function atualizarTabela(resultados) {
        // Limpa o corpo da tabela
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
    
        // Adiciona as linhas com os resultados da busca à tabela
        for (let i = 0; i < resultados.length; i++) {
            let linha = document.createElement("tr");
    
            linha.innerHTML = `
                <td>${formatarDataISO8601ParaDDMMYYYY(resultados[i].dia)}</td>
                <td>${resultados[i].entrada}</td>
                <td>${resultados[i].cafe1}</td>
                <td>${resultados[i].cafe2}</td>
                <td>${resultados[i].almoco1}</td>
                <td>${resultados[i].almoco2}</td>
                <td>${resultados[i].cafe3}</td>
                <td>${resultados[i].cafe4}</td>
                <td>${resultados[i].saida}</td>
                <td>${resultados[i].extra}</td>
                <td>
                    <div>
                        <button data-id="${resultados[i].usuId}" class="btn btn-primary editarBtn">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button data-id="${resultados[i].usuId}" class="btn btn-danger btnExclusao">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
    
            tbody.appendChild(linha);
        }
    }
    // EXPORTAR PARA EXCEL
    document.getElementById("exportarExcelBtn").addEventListener("click", exportarParaExcel);

    function exportarParaExcel() {
        // Obtenha os dados da tabela
        let tabela = document.querySelector("table");
        let dados = XLSX.utils.table_to_sheet(tabela);

        // Crie um objeto de trabalho Excel
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, dados, "Horas");

        // Salve o arquivo Excel
        XLSX.writeFile(wb, "horas.xlsx");
    } 
    
    
    
    
    
    

///////////////////////////////////////////////////////////////////////////////////////////////////

    let botoes = document.querySelectorAll(".btnExclusao");

    for(let i = 0; i<botoes.length; i++){
        botoes[i].onclick = excluirUsuario;
    }

    function excluirUsuario() {
        let idExclusao = this.dataset.id;
        if(idExclusao != undefined && idExclusao != ""){

            fetch('/usuarios/excluir', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: idExclusao})
            })
            .then(function(r) {
                return r.json();
            })
            .then(function(r) {
                if(r.ok){
                    alert(r.msg);
                    window.location.reload();
                }
                else{
                    alert(r.msg);
                }
            })
        }
        else{
            alert("Dados inválidos!")
        }
    }
    
    // Selecione todos os botões de edição com uma classe comum, por exemplo, "editarBtn"
const botoesEditar = document.querySelectorAll(".editarBtn");

// Adicione um evento de clique a cada botão de edição
botoesEditar.forEach(function(botao) {
    botao.addEventListener("click", function() {
        let idEdicao = this.dataset.id;
        if (idEdicao) {
            // Redirecione o usuário para a página de edição com o ID do usuário
            window.location.href = `/usuarios/editar/${idEdicao}`;
        } else {
            alert("ID de usuário inválido!");
        }
    });
});
    
})