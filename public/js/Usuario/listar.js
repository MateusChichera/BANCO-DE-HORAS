document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM completamente carregado");
    document.getElementById("pesquisarBtn").addEventListener("click", pesquisarHoras);

 // Função para converter horas no formato hh:mm:ss para minutos
function converterParaMinutos(hora) {
    const [horas, minutos, segundos] = hora.split(":");
    return parseInt(horas) * 60 + parseInt(minutos) + parseInt(segundos) / 60;
}

// Função para converter minutos para o formato hh:mm
function converterParaFormatoHora(minutos) {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${String(horas).padStart(2, '0')}:${String(minutosRestantes).padStart(2, '0')}`;
}


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
                    atualizarTabela(resposta.resultados,resposta.implantacoes);
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

    function atualizarTabela(resultados,implantacoes) {

        
        // Limpa o corpo da tabela
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        let totalHorasExtras = 0;
        let totalMinutosExtras = 0;
        // Adiciona as linhas com os resultados da busca à tabela
        for (let i = 0; i < resultados.length; i++) {
            let linha = document.createElement("tr");
            const minutosExtras = converterParaMinutos(resultados[i].extra);
           
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
    <td class="extra-column">${resultados[i].extra}</td>
    <td>
        <div>
            <button data-id="${resultados[i].idhora}" class="btn btn-primary editarBtn">
                <i class="fas fa-pen"></i>
            </button>
            <button data-id="${resultados[i].idhora}" class="btn btn-danger btnExclusao">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    </td>
`;
            totalMinutosExtras += minutosExtras;
            tbody.appendChild(linha);
        }
        
        const totalHorasExtrasFormatado = converterParaFormatoHora(totalMinutosExtras);

    // Exiba o total de horas extras no final da tabela
    let linhaTotalExtras = document.createElement("tr");
    linhaTotalExtras.innerHTML = `
        <td class="extra-column">Total de Horas Extras:</td>
        <td class="extra-column">${totalHorasExtrasFormatado}</td>
        <td></td>`;
    tbody.appendChild(linhaTotalExtras);

    // -------------------------------------------------------------TABELA IMPLANTAÇÃO--------------------------------------------------------------------------
    for (let i = 0; i < implantacoes.length; i++) {
        let linha = document.createElement("tr");
        linha.innerHTML = `

<td>${implantacoes[i].imp_nome}</td>
<td>${implantacoes[i].imp_cidade}</td>
<td>${implantacoes[i].imp_estado}</td>
<td>${formatarDataISO8601ParaDDMMYYYY(implantacoes[i].imp_dia)}</td>
<td>${implantacoes[i].imp_tipo}</td>
<td>${implantacoes[i].imp_obs}</td>
<td>
    <div>
        <button data-id="${implantacoes[i].imp_id}" class="btn btn-primary editarBtn">
            <i class="fas fa-pen"></i>
        </button>
        <button data-id="${implantacoes[i].imp_id}" class="btn btn-danger btnExclusao">
            <i class="fas fa-trash"></i>
        </button>
    </div>
</td>
`;
    document.getElementById("tabelaImplantacoes").appendChild(linha);
    var cont =parseInt(implantacoes.length)
    
    }
    //TOTAL DE IMPLANTAÇÕES
let linhaTotalimp = document.createElement("tr");
linhaTotalimp.innerHTML = `
    <td class="extra-column">Total de Implantações:</td>
    <td class="extra-column">${cont}</td>
    <td></td>`;
document.getElementById("tabelaImplantacoes").appendChild(linhaTotalimp);

    let botoesExclusao = document.querySelectorAll(".btnExclusao");
    for (let i = 0; i < botoesExclusao.length; i++) {
        botoesExclusao[i].addEventListener("click", excluirUsuario);
    }
}



    // EXPORTAR PARA EXCEL
    document.getElementById("exportarExcelBtn").addEventListener("click", exportarParaExcel);
    document.getElementById("exportarExcelBtn1").addEventListener("click", exportarParaExcel1);

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
    function exportarParaExcel1() {
        // Obtenha os dados da tabela
        let tabela = document.getElementById("tabelaImplantacoes");
        let dados = XLSX.utils.table_to_sheet(tabela);

        // Crie um objeto de trabalho Excel
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, dados, "Implantações");

        // Salve o arquivo Excel
        XLSX.writeFile(wb, "Implantações.xlsx");
    } 
    
    
    
    
    
    

///////////////////////////////////////////////////////////////////////////////////////////////////

//let botoes = document.querySelectorAll(".btnExclusao");

//for (let i = 0; i < botoes.length; i++) {
 //   botoes[i].addEventListener("click", excluirUsuario);
//}

    function excluirUsuario(event) {
       
         // Impede o comportamento padrão do botão (se houver)
         event.preventDefault();
        let idExclusao = this.dataset.id;
        console.log(idExclusao);
        if (idExclusao != undefined && idExclusao != "") {
            // Exibe um diálogo de confirmação antes de excluir
            if (confirm("Tem certeza que deseja excluir este item?")) {
                var currentUrl = new URL(window.location.href);
                fetch('http://152.67.45.250:3000/usuarios/excluir', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: idExclusao })
                })
                    .then(function (r) {
                        return r.json();
                    })
                    .then(function (r) {
                        if (r.ok) {
                            alert(r.msg);
                            window.location.reload();
                        } else {
                            alert(r.msg);
                        }
                    })
                    .catch(function (erro) {
                        console.error("Erro ao excluir item:", erro);
                    });
            } else {
                // Se o usuário cancelar a exclusão, não faz nada
                console.log("Exclusão cancelada pelo usuário.");
            }
        } else {
            alert("Dados inválidos!");
        }
    }
    
    
    console.log("Antes de adicionar o evento de clique");

    document.addEventListener("click", function(event) {
        const botaoClicado = event.target.closest(".editarBtn");
    
        if (botaoClicado) {
            console.log("Botão clicado");
            let idEdicao = botaoClicado.dataset.id;
    
            if (idEdicao) {
                // Obtém a parte da URL antes da rota atual
                let baseUrl = window.location.href.split('/').slice(0, -1).join('/');
                // Redireciona para a rota de edição concatenada com /usuario
                window.location.assign(`${baseUrl}/usuarios/editar/${idEdicao}`);
                localStorage.setItem('idhora', idEdicao);
                
            } else {
                alert("ID de usuário inválido!");
            }
        }

    });

    
});
    