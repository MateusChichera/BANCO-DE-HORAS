document.addEventListener("DOMContentLoaded", function() {


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