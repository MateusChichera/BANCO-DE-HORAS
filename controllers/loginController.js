const UsuarioModel = require("../models/usuarioModel");

class LoginController {

    indexView(req, res){
        res.render('login/index', {layout: 'login/index'})
    }

    autenticar(req, res) {
        const usuarioModel = new UsuarioModel();
        const email = req.body.email;
        const senha = req.body.senha;
    
        usuarioModel.autenticar(email, senha)
            .then(user => {
                if (user) {
                    res.send({ status: true, msg: "Autenticação realizada com sucesso" });
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