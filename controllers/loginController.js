class LoginController {

    indexView(req, res){
        res.render('login/index', {layout: 'login/index'})
    }

    autenticar(req, res){
        const usuarioModel = new UsuarioModel();
        usuarioModel.autenticar(login,senha)
        if(req.body.email != undefined && req.body.senha != undefined){
            if(req.body.email == "fulvio@unoeste.br" && req.body.senha == "12345"){
                res.send({status: true, msg: "Autenticação realizada com sucesso"})
            }
            else{
                res.send({status: false, msg: "Credenciais inválidas"})
            }
        }
        else{
            res.send({status: false, msg: "Credenciais inválidas"})
        }
    }

}

module.exports = LoginController