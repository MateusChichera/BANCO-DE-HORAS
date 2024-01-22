
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnGravar").addEventListener('click', gravarUsuario);


    

    function gravarUsuario() {
        let id = document.getElementById("usuarioId");
        let nome = document.getElementById("usuarioNome");
        let email = document.getElementById("usuarioEmail");
        let perfil = document.getElementById("usuarioPerfil");
        let senha = document.getElementById("usuarioSenha");
        let ativo = document.getElementById("usuarioAtivo");

        if(validarCampos(nome, email, perfil, senha)) {
           
            var usuario = {
                id: id.value,
                nome: nome.value,
                email: email.value,
                perfil: perfil.value,
                senha: senha.value,
                ativo: ativo.checked
            }

            fetch('/usuarios/editar', {
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
                    nome.value = "";
                    email.value = "";
                    perfil.value = 0;
                    senha.value = "";
                    ativo.checked = false;                
                }
                else{
                    alert(resposta2.msg);
                }
            })
        }
        else{
            alert("Preencha os campos destacados corretamente!");
        }
    }

    function validarCampos(nome, email, perfil, senha) {

        //limpa a estilização antes
        nome.style["border-color"] = "unset";
        email.style["border-color"] = "unset";
        perfil.style["border-color"] = "unset";
        senha.style["border-color"] = "unset";

        let erros = [];
        if(nome.value == "")
            erros.push(nome);
        if(email.value == "")
            erros.push(email);
        if(perfil.value == 0)
            erros.push(perfil);
        if(senha.value == "")
            erros.push(senha);

        if(erros.length > 0) {
            for(let i = 0; i<erros.length; i++){
                erros[i].style["border-color"] = "red";
            }

            return false;
        }
        else {

            return true;
        }
    }

    function limparCampos() {

    }
})