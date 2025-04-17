




/// LISTANDO CIDADES API 
document.addEventListener('DOMContentLoaded', function() {
    // Armazenar o valor selecionado do checkbox
    let valorSelecionado;

    // Event listener para chamar a função quando o botão for clicado
    const btnGravar = document.getElementById('btnGravar');
    btnGravar.addEventListener('click', function() {
        // Chame a função para gravar o valor quando o botão for clicado
        gravarimplantacao();
    });

    // Função para gravar o valor no banco de dados
    function gravarimplantacao() {

            //  PEGANDO OS VALORES DO EJS
        let usu = document.getElementById("usuario");
        let tipo = document.getElementById("tipo");
        let cliente = document.getElementById("cliente");
        let data = document.getElementById("data");
        let estado = document.getElementById("estado");
        let cidade = document.getElementById("cidade");
        let obs = document.getElementById("observacoes");
        let contato = document.getElementById("contato");
        let tel = document.getElementById("tel");
        let tel1 = document.getElementById("tel1");
        let sistema = document.getElementById("sistema");
        let datavencimento = document.getElementById("datavencimento");
        let mensalidade = document.getElementById("mensalidade");
        //let datapag = document.getElementById("datapag")
        let tel2 = document.getElementById('tel2');
        let tel3 = document.getElementById('tel3');


        console.log("ENVIADO PARA O BANCO",usu,tipo,cliente,data,estado,cidade,obs,contato,tel,tel1,sistema,datavencimento,mensalidade,tel2,tel3);

        var usuario = {
            usu: usu.value,
            tipo: tipo.value,
            cliente: cliente.value,
            data: data.value,
            estado: estado.value,
            cidade: cidade.value,
            obs: obs.value,
            contato: contato.value,
            tel: tel.value,
            tel1: tel1.value,
            sistema: sistema.value,
            datavencimento: datavencimento.value,
            mensalidade: mensalidade.value,
            tel2: tel2.value,
            tel3: tel3.value
        }
        let currentUrl = window.location.href;

    // Atualizando a URL para incluir o caminho da rota desejada
    //let apiUrl = currentUrl + '/cadastrar';
//FETCH ENVIANDO PARA A CONTROLADORA 
        fetch(currentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(function(resposta1) {
            return resposta1.json()
        })
        .then(function(resposta2) {
            if(resposta2.ok) {
                alert(resposta2.msg);
                usu.value = null;
                tipo.value = null;
                cliente.value = null;
                data.value = null;
                estado.value = null;
                cidade.value = null;
                obs.value = null;
                contato.value = null;
                tel.value = null;
                tel1.value = null;
                sistema.value = null;
                datavencimento.value = null;
                mensalidade.value = null;
                tel2.value = null
                tel3.value = null
                               
            }
            else{
                alert(resposta2.msg);
            }
        })
    }
    

    

//-------------------------------------------------------------------------------------------------------- API PARA BUSCAR CIDADE --------------------------------------------------------------------
    // Função para buscar as cidades de um determinado estado FUNCIONANDO
    async function getCidades(estado) {
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.map(cidade => cidade.nome);
        } catch (error) {
            console.error('Erro ao buscar cidades:', error);
            return [];
        }
    }

    // Função para preencher o select de cidades com base no estado selecionado funcionando
    async function preencherCidades() {
        console.log("CHAMADO A FUNÇÃO DE PREENCHER CIDADES");
        const estadoSelecionado = document.getElementById('estado').value;
        const selectCidades = document.getElementById('cidade');

        // Limpar o select de cidades antes de preencher FUNCIONANDO
        selectCidades.innerHTML = '<option value="">--Selecione--</option>';

        if (estadoSelecionado) {
            const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`;

            try {
                const response = await fetch(url);
                const cidades = await response.json();

                // Adicionar as cidades ao select
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

    // Event listener para chamar a função quando o estado for alterado
    const estadoSelect = document.getElementById('estado');
    if (estadoSelect) {
        estadoSelect.addEventListener('change', preencherCidades);
    }

    // Chamar a função inicialmente para preencher o select de cidades com base no estado selecionado inicialmente
    preencherCidades();
});
