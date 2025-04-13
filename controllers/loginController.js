const UsuarioModel = require("../models/usuarioModel");

class LoginController {

    indexView(req, res) {
        res.render('Login/index', { layout: false });
    }
    

    autenticar(req, res) {
        const usuarioModel = new UsuarioModel();
        const email = req.body.email;
        const senha = req.body.senha;
        var usuarioLogado = false;
    
        usuarioModel.autenticar(email, senha)
            .then(user => {
                if (user) {
                    //AUTENTICAÇÃO COM COOKIES FUNCIONANDO 
                    console.log("Usuário retornado pela autenticação:", user);
                    res.cookie('userId', user.usuid);
                    res.cookie('Nome', user.usunome);
                    res.send({ status: true, msg: "Autenticação realizada com sucesso" , user});
                    console.log("DENTRO DA CONTROLLER ID DO USUARIO LOGADO:",user.usuid);
                } else {
                    res.send({ status: false, msg: "Credenciais inválidas" });
                }
            })
            .catch(error => {
                console.error("Erro ao autenticar:", error);
                res.send({ status: false, msg: "Erro ao autenticar" });
            });
    }
}

module.exports = LoginController