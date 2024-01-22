const UsuarioModel = require("../models/usuarioModel");
const express = require('express');
const app = express();
const cors = require('cors'); // Certifique-se de instalar o pacote 'cors'

app.use(cors()); // Isso permite solicitações de qualquer origem


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir acesso de qualquer origem
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

class UsuarioController {


    async listarView(req, res) {
        let usu = new UsuarioModel();
        let listaUsuarios = await usu.listarUsuarios();
        res.render('usuario/listar', {lista: listaUsuarios});
    }

    cadastrarView(req, res) {
        res.render('usuario/cadastrar');
    }
    editarView(req, res) {
        // Passe o ID do usuário para a página de edição como um parâmetro
        const userId = req.params.id;
        res.render('usuario/editar', { userId });
    }
    
    editar(req, res) {
        let adc = new UsuarioModel();
        if(req.body.id != ''  ) {
          const newuser={
                id: req.body.id,
                nome: req.body.nome,
                email:req.body.email,
                ativo:req.body.ativo,
                senha:req.body.senha,
                perfil: req.body.perfil
            }
   adc.edtUsuarios(newuser.id,newuser.nome, newuser.email, newuser.ativo, newuser.senha, newuser.perfil);
           
            res.send({ok: true, msg: "Usuário alterado"})
        }
        else{
            res.send({ok: false, msg: "Dados inválidos"})
        }
    }


    excluir(req, res) {
        const exc = new UsuarioModel();
        
        if(req.body.id != ""){
            exc.excUsuarios(req.body.id)

            res.send({ok: true, msg: "Usuário excluído!"})
        }
        else{
            res.send({ok: false, msg: "Dados inválidos!"})
        }
    }
// CADASTRAR USUARIOS
    cadastrar(req, res) {
        let adc = new UsuarioModel();
          const newuser={
        
                usu: req.body.usu,
                entrada:req.body.entrada,
                cafe1:req.body.cafe1,
                cafe2:req.body.cafe2,
                almoco1: req.body.almoco1,
                almoco2: req.body.almoco2,
                cafe3: req.body.cafe3,
                cafe4: req.body.cafe4,
                saida: req.body.saida,
                data: req.body.data,


            }
   adc.adcUsuarios(newuser.usu, newuser.entrada, newuser.cafe1, newuser.cafe2, newuser.almoco1, newuser.almoco2, newuser.cafe3, newuser.cafe4,newuser.saida,newuser.data);
           
            res.send({ok: true, msg: "Usuário adicionado"})
        
    }
}

module.exports = UsuarioController