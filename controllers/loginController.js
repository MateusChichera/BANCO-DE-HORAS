const UsuarioModel = require("../models/usuarioModel");
const { gerarHash } = require("../utils/hashGenarator.js");  // Importando a função gerarHash

class LoginController {

    indexView(req, res) {
        res.render('Login/index', { layout: false });
    }

    autenticar(req, res) {
        const usuarioModel = new UsuarioModel();
        const email = req.body.email;
        const senha = req.body.senha;

        usuarioModel.autenticar(email, senha)
            .then(user => {
                if (user) {
                    // Aqui, não precisamos mais do 'this', pois estamos chamando diretamente a função importar
                    const userHash = gerarHash(user.usuid);
                    console.log("HASH DO USUARIO:", userHash);
                    console.log("ID DO USUARIO:", user.usuid);
                    // Armazenando o ID do usuário e o hash no cookie
                    res.cookie('userId', user.usuid, { httpOnly: false, secure: false, maxAge: 15 * 60 * 1000 });
                    res.cookie('userHash', userHash, { httpOnly: false, secure: false, maxAge: 15 * 60 * 1000 });
                    res.cookie('Nome', user.usunome, { httpOnly: false, secure: false, maxAge: 15 * 60 * 1000 });

                    res.send({ status: true, msg: "Autenticação realizada com sucesso", user });
                    console.log("DENTRO DA CONTROLLER ID DO USUARIO LOGADO:", user.usuid);
                } else {
                    res.send({ status: false, msg: "Credenciais inválidas" });
                }
            })
            .catch(error => {
                console.error("Erro ao autenticar:", error);
                res.send({ status: false, msg: "Erro ao autenticar" });
            });
    }

    // Função para logout, removendo os cookies
    logout(req, res) {
        res.clearCookie('userId');
        res.clearCookie('userHash');
        res.clearCookie('Nome');
        res.send({ status: true, msg: "Deslogado com sucesso!" });
    }
}

module.exports = LoginController;
