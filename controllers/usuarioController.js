const UsuarioModel = require("../models/usuarioModel");
const express = require('express');
const app = express();
const moment = require('moment');


class UsuarioController {

 //BUSCA HORA POR DATA 
 // UsuarioController.js

 // ...

async buscarHoras(req, res) {
    try {
        const usuId = req.query.id;
        const diaInicio = req.query.dia;
        const diaFim = req.query.dia2;

        // Verifique se todas as informações necessárias estão presentes
        if (usuId && diaInicio && diaFim) {
            const usuarioModel = new UsuarioModel();
            const resultados = await usuarioModel.buscahoras(usuId, diaInicio, diaFim);

            res.send({
                ok: true,
                msg: "Horas encontradas com sucesso.",
                resultados: resultados
            });
        } else {
            res.send({ ok: false, msg: "Por favor, forneça todas as informações necessárias para a pesquisa." });
        }
    } catch (error) {
        console.error("Erro ao buscar horas:", error);
        res.send({ ok: false, msg: "Erro ao buscar horas no banco de dados." });
    }
}

// ...




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
           
            res.send({ok: true, msg: "Horas Cadastradas"})
        
    }
}

module.exports = UsuarioController