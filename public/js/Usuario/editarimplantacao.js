document.addEventListener('DOMContentLoaded', function () {
    // ID da implantação, que será usado para buscar os dados
    let idimplantacao = localStorage.getItem('idimplantacao');
    let currentUrl = `http://152.67.45.250:3000/usuarios/editar/viagem/${idimplantacao}`; // URL para buscar os dados da implantação

    // Função para preencher o formulário com os dados da implantação
    async function preencherFormulario(implantacao) {
        document.getElementById('usuario').value = implantacao.usuid || '';
        document.getElementById('carro').value = implantacao.imp_carro || '';
        document.getElementById('tipo').value = implantacao.imp_tipo || '';
        document.getElementById('cliente').value = implantacao.imp_nome || '';
        document.getElementById('data').value = implantacao.imp_dia ? new Date(implantacao.imp_dia).toISOString().split('T')[0] : '';
        document.getElementById('estado').value = implantacao.imp_estado || '';

        // Preencher cidades após o estado estar definido
        await preencherCidades(implantacao.imp_estado);
        document.getElementById('cidade').value = implantacao.imp_cidade || '';

        document.getElementById('contato').value = implantacao.imp_contato || '';
        document.getElementById('tel').value = implantacao.imp_tel || '';
        document.getElementById('tel1').value = implantacao.imp_tel1 || '';
        document.getElementById('tel2').value = implantacao.imp_tel2 || '';
        document.getElementById('tel3').value = implantacao.imp_tel3 || '';
        document.getElementById('sistema').value = implantacao.imp_sis || '';
        document.getElementById('datavencimento').value = implantacao.imp_dtvenc ? new Date(implantacao.imp_dtvenc).toISOString().split('T')[0] : '';
        document.getElementById('mensalidade').value = implantacao.imp_mensalidade || '';
        document.getElementById('observacoes').value = implantacao.imp_obs || '';
    }

    // Função para buscar os dados da implantação
    async function buscarImplantacao() {
        try {
            const resposta = await fetch(currentUrl);
            const dados = await resposta.json();

            if (resposta.ok) {
                preencherFormulario(dados.detalhes[0]);  // Acessando o primeiro item do array 'detalhes'
            } else {
                alert('Erro ao buscar implantação');
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            alert('Erro ao buscar dados');
        }
    }

    // Chama a função para preencher os dados assim que a página carregar
    buscarImplantacao();

    // Event listener para o botão de gravação
    const btnGravar = document.getElementById('btnGravar');
    btnGravar.addEventListener('click', function () {
        gravarimplantacao();
    });

    // Função para gravar os dados da implantação
    function gravarimplantacao() {
        document.getElementById("loadingOverlay").style.display = "flex";
        let usuario = {
            usu: document.getElementById("usuario").value,
            carro: document.getElementById("carro").value,
            tipo: document.getElementById("tipo").value,
            cliente: document.getElementById("cliente").value,
            data: document.getElementById("data").value,
            estado: document.getElementById("estado").value,
            cidade: document.getElementById("cidade").value,
            obs: document.getElementById("observacoes").value,
            contato: document.getElementById("contato").value,
            tel: document.getElementById("tel").value,
            tel1: document.getElementById("tel1").value,
            tel2: document.getElementById("tel2").value,
            tel3: document.getElementById("tel3").value,
            sistema: document.getElementById("sistema").value,
            datavencimento: document.getElementById("datavencimento").value,
            mensalidade: document.getElementById("mensalidade").value
        };

        let idimplantacao = localStorage.getItem('idimplantacao');
        let urlGravacao = `http://152.67.45.250:3000/usuarios/edt/viagem/${idimplantacao}`;

        fetch(urlGravacao, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })  
            .then(res => res.json())
            .then(resposta => {
                if (resposta.ok) {
                    alert("Alteração feita com sucesso, mensagem enviada",resposta.msg);
                    resetForm();
                    localStorage.removeItem('idimplantacao'); 
                    window.location.href = "http://152.67.45.250:3000/usuarios/viagem";
                } else {
                    alert(resposta.msg || 'Erro ao salvar');
                }
            })
            
            .catch(error => {
                console.error('Erro ao gravar:', error);
                alert('Erro ao alterar os dados');
            })
            .finally(() => {
                document.getElementById("loadingOverlay").style.display = "none"; // 👈 Esconde o overlay
            });
            
    }

    function resetForm() {
        document.getElementById('usuario').value = '';
        document.getElementById('tipo').value = '';
        document.getElementById('cliente').value = '';
        document.getElementById('data').value = '';
        document.getElementById('estado').value = '';
        document.getElementById('cidade').innerHTML = '<option value="">--Selecione--</option>';
        document.getElementById('observacoes').value = '';
        document.getElementById('contato').value = '';
        document.getElementById('tel').value = '';
        document.getElementById('tel1').value = '';
        document.getElementById('tel2').value = '';
        document.getElementById('tel3').value = '';
        document.getElementById('sistema').value = '';
        document.getElementById('datavencimento').value = '';
        document.getElementById('mensalidade').value = '';
    }

    async function preencherCidades(estadoSelecionado) {
        const selectCidades = document.getElementById('cidade');
        selectCidades.innerHTML = '<option value="">--Selecione--</option>';

        if (estadoSelecionado) {
            const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`;

            try {
                const response = await fetch(url);
                const cidades = await response.json();

                cidades.forEach(cidade => {
                    const option = document.createElement('option');
                    option.text = cidade.nome;
                    option.value = cidade.nome;
                    selectCidades.add(option);
                });
            } catch (error) {
                console.error('Erro ao buscar cidades:', error);
            }
        }
    }

    const estadoSelect = document.getElementById('estado');
    if (estadoSelect) {
        estadoSelect.addEventListener('change', function () {
            preencherCidades(this.value);
        });
    }
});
