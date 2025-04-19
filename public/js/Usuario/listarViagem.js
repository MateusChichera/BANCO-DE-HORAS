document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente carregado");
    document.getElementById("pesquisarBtn").addEventListener("click", pesquisarHoras);

    function pesquisarHoras() {
        let diaInicio = document.getElementById("dia").value;
        let diaFim = document.getElementById("dia2").value;

        if (diaInicio && diaFim) {
            let apiUrl = `http://152.67.45.250:3000/usuarios/agendamentos?dia=${diaInicio}&dia2=${diaFim}`;

            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function (resposta) {
                return resposta.json();
            })
            .then(function (resposta) {
                if (resposta && resposta.implantacao && Array.isArray(resposta.implantacao)) {
                    atualizarTabela(resposta.implantacao);
                   // console.log(resposta);
                    //console.log(implantacao);
                    //console.log(implantacoes);
                } else {
                    alert(resposta.msg || "Nenhum resultado encontrado.");
                }
            })
            .catch(function (erro) {
                console.error("Erro ao buscar viagens:", erro);
            });

        } else {
            alert("Por favor, preencha todas as informações de pesquisa.");
        }
    }

    function formatarDataISO8601ParaDDMMYYYY(dataISO8601) {
        const dataObj = new Date(dataISO8601);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    function formatarParaReais(valor) {
        const numero = parseFloat(valor);
        if (isNaN(numero)) return "Valor inválido";
        
        return numero.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }
    

    function atualizarTabela(implantacao) {
        const tabela = document.getElementById("tabelaImplantacoes");
       // tabela.innerHTML = ""; // limpa tabela antes de adicionar novas linhas
        const tbody = document.querySelector("#tabelaImplantacoes tbody");
    tbody.innerHTML = ""; // limpa apenas o corpo da tabela

        for (let i = 0; i < implantacao.length; i++) {
            let linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${implantacao[i].imp_nome}</td>
                <td>${implantacao[i].imp_cidade}</td>
                <td>${implantacao[i].imp_estado}</td>
                <td>${formatarDataISO8601ParaDDMMYYYY(implantacao[i].imp_dia)}</td>
                <td>${implantacao[i].imp_tipo}</td>
                <td>${implantacao[i].imp_sis}</td>
                <td>${formatarDataISO8601ParaDDMMYYYY(implantacao[i].imp_dtvenc)}</td>
                <td>${formatarParaReais(implantacao[i].imp_mensalidade)}</td>
                <td>${implantacao[i].usunome}</td>
                <td>
                    <div>
                        <button data-id="${implantacao[i].idimplantacao}" class="btn btn-primary editarBtn">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button data-id="${implantacao[i].idimplantacao}" class="btn btn-danger btnExclusao">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tabela.appendChild(linha);
        }

        // Linha com total
        let linhaTotalimp = document.createElement("tr");
        linhaTotalimp.innerHTML = `
            <td class="extra-column">Total de Implantações:</td>
            <td class="extra-column">${implantacao.length}</td>
            <td></td>
        `;
        tabela.appendChild(linhaTotalimp);

        let botoesExclusao = document.querySelectorAll(".btnExclusao");
        for (let i = 0; i < botoesExclusao.length; i++) {
            botoesExclusao[i].addEventListener("click", excluirUsuario);
        }
    }

    document.getElementById("exportarExcelBtn1").addEventListener("click", exportarParaExcel1);

    function exportarParaExcel1() {
        let tabela = document.getElementById("tabelaImplantacoes");
        let dados = XLSX.utils.table_to_sheet(tabela);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, dados, "Implantações");
        XLSX.writeFile(wb, "Implantações.xlsx");
    }

    function excluirUsuario(event) {
        event.preventDefault();
        let idExclusao = this.dataset.id;
        if (idExclusao) {
            if (confirm("Tem certeza que deseja excluir esta implantação?")) {
                console.log(idExclusao)
                fetch('http://152.67.45.250:3000/usuarios/deletar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: idExclusao })
                })
                .then(r => r.json())
                .then(r => {
                    if (r.ok) {
                        alert(r.msg);
                        window.location.reload();
                    } else {
                        alert("Não foi possível excluir a implantação",r.msg);
                    }
                })
                .catch(erro => console.error("Erro ao excluir implantacao:", erro));
            } else {
                console.log("Exclusão cancelada pelo usuário.");
            }
        } else {
            alert("Dados inválidos!");
        }
    }

    document.addEventListener("click", function (event) {
        const botaoClicado = event.target.closest(".editarBtn");
    
        if (botaoClicado) {
            let idEdicao = botaoClicado.dataset.id;
    
            if (idEdicao) {
                // Monta a URL base corretamente até o domínio e adiciona o path fixo da rota
            
                window.location.assign(`http://152.67.45.250:3000/usuarios/editar/viagem`);
                
                // Salva o ID no localStorage (caso queira recuperar depois)
                localStorage.setItem('idimplantacao', idEdicao);
            } else {
                alert("ID de usuário inválido!");
            }
        }
    });
    
});
