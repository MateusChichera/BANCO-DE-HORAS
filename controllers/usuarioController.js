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
            const implantacoes = await usuarioModel.buscaimplantacoes(usuId,diaInicio,diaFim);


            res.send({
                ok: true,
                msg: "Horas encontradas com sucesso.",
                resultados: resultados,
                implantacoes: implantacoes
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
        res.render('usuario/listar');
    }

    implantacoesView(req, res) {
        res.render('usuario/implantacoes');
    }

    cadastrarView(req, res) {
        res.render('usuario/cadastrar');
    }
    editarView(req, res) {
        console.log("Método editarView chamado.");
        const userId = req.params.id;
    
        // Chame a função do modelo para buscar detalhes com base no ID
        const usuarioModel = new UsuarioModel();
        usuarioModel.buscaid(userId)
            .then(detalhes => {
                // Renderize a view e envie os detalhes para o front-end
                console.log("Detalhes recuperados:", detalhes);
                res.render('usuario/editar', { userId, detalhes });
            })
            .catch(error => {
                console.error("Erro ao buscar detalhes do usuário:", error);
                res.send({ ok: false, msg: "Erro ao buscar detalhes do usuário no banco de dados." });
            });
        
        console.log("Método editarView concluído.");
    }
    
    
    // FUNCIONANDO
    editar(req, res) {
        let adc = new UsuarioModel();
        const newuser = {
            usu: req.body.usu,
            entrada: req.body.entrada,
            cafe1: req.body.cafe1,
            cafe2: req.body.cafe2,
            almoco1: req.body.almoco1,
            almoco2: req.body.almoco2,
            cafe3: req.body.cafe3,
            cafe4: req.body.cafe4,
            saida: req.body.saida,
            data: req.body.data,
            horasExtras: req.body.horasExtras,
            idhora: req.body.idhora,
        };
    
        adc.edtUsuarios(newuser.usu, newuser.entrada, newuser.cafe1, newuser.cafe2, newuser.almoco1, newuser.almoco2, newuser.cafe3, newuser.cafe4, newuser.saida, newuser.data, newuser.horasExtras, newuser.idhora)
            .then(() => {
                res.send({ ok: true, msg: "Horas Editadas" });
            })
            .catch(error => {
                console.error(error);
                res.status(500).send({ ok: false, msg: "Erro ao editar horas verificar log" });
            });
    }
   //NAO FUNCIONANDO
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
                horasExtras: req.body.horasExtras,
            }



   adc.adcUsuarios(newuser.usu, newuser.entrada, newuser.cafe1, newuser.cafe2, newuser.almoco1, newuser.almoco2, newuser.cafe3, newuser.cafe4,newuser.saida,newuser.data,newuser.horasExtras);
           
            res.send({ok: true, msg: "Horas Cadastradas"})
        
    }
    implantacoes(req, res) {
        let adc = new UsuarioModel();
          const newuser={
        
                usu: req.body.usu,
                tipo: req.body.tipo,
                cliente: req.body.cliente,
                data: req.body.data,
                estado: req.body.estado,
                cidade: req.body.cidade,
                obs: req.body.obs,
            }



   adc.adcImplantacao(newuser.usu, newuser.tipo, newuser.cliente, newuser.data, newuser.estado, newuser.cidade, newuser.obs);
           
            res.send({ok: true, msg: "Implantação cadastrada"})
        
    }
}

module.exports = UsuarioController