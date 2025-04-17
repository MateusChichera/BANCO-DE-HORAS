const UsuarioModel = require("../models/usuarioModel");
const express = require('express');
const app = express();
const moment = require('moment');
const Database = require('../utils/database')
const { calcularDistancia } = require('./calculardistancia.js'); 
const axios = require('axios');

const conexao = new Database();


class UsuarioController {
//RELATORIO DE DISTANCIAS KM
async relatorioViagens(req, res) {
    try {
        console.log('Chegou na função relatorioViagens');
        
        // Captura os valores da URL
        const usuid = req.query.id;
        const diaInicio = req.query.dia.trim();
        const diaFim = req.query.dia2.trim();
        
        console.log("usuid:", usuid);
        console.log("diaInicio:", diaInicio);
        console.log("diaFim:", diaFim);

        if (!usuid || !diaInicio || !diaFim) {
            return res.send({ ok: false, msg: "Dados insuficientes para gerar o relatório." });
        }

        const cidadeOrigem = "Presidente Prudente, SP";

        const sql = `
            SELECT imp_cidade, imp_estado 
            FROM implantacoes 
            WHERE usuid = ? AND imp_dia BETWEEN ? AND ?
        `;
        const rows = await conexao.ExecutaComando(sql, [usuid, diaInicio, diaFim]);
        console.log('Rows retornadas:', rows);

        let totalKm = 0;
        let cidadesVisitadas = [];

        let cacheDistancia = {};

        for (let row of rows) {
            const destino = `${row.imp_cidade}, ${row.imp_estado}`;
            cidadesVisitadas.push(destino);
        
            if (!cacheDistancia[destino]) {
                // Chama a função calcularDistancia diretamente
                const distanciaKm = await calcularDistancia(cidadeOrigem, destino);
                cacheDistancia[destino] = distanciaKm;
            }
        
            totalKm += (cacheDistancia[destino] * 2); // ida e volta
        }
        

        res.send({
            ok: true,
            debug: {
                usuid,
                diaInicio,
                diaFim,
                rows
            },
            cidadesVisitadas,
            totalKm: Math.round(totalKm)
        });
    } catch (err) {
        res.send({
            ok: false,
            msg: "Erro ao gerar relatório de viagens.",
            erro: err.message,
            stack: err.stack
        });
    }
}

 //BUSCA HORA POR DATA 
 // UsuarioController.js

     //------------------------- REL VIAGEM MENSAGEM

  async relVIagem(req,res){
        try{
        const dia = req.body.dia
        const dia1 = req.body.dia1
        if(dia && dia1){
            const usuarioModel = new UsuarioModel();
            const resultado = await usuarioModel.relViagem(dia,dia1);
        }       

        }catch(error){
            console.error("Erro ao buscar viagens:", error);
            res.send({ ok: false, msg: "Erro ao buscar viagens no banco de dados." })
        }
     }

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
        res.render('Usuario/listar');
    }

    implantacoesView(req, res) {
        res.render('Usuario/implantacoes');
    }

    cadastrarView(req, res) {
        res.render('Usuario/cadastrar');
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
                res.render('Usuario/editar', { userId, detalhes });
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
    async implantacoes(req, res) {
        const adc = new UsuarioModel();
        const newuser = {
          usu: req.body.usu,
          tipo: req.body.tipo,
          cliente: req.body.cliente,
          data: req.body.data,
          estado: req.body.estado,
          cidade: req.body.cidade,
          obs: req.body.obs,
          imp_contato: req.body.contato,
          imp_tel: req.body.tel,
          imp_tel1: req.body.tel1,
          imp_sis: req.body.sistema,
          imp_dtvenc: req.body.datavencimento,
          imp_mensalidade: req.body.mensalidade,
          imp_tel2: req.body.tel2,
          imp_tel3: req.body.tel3
        };
      
        try {
          // 1. Grava a implantação
          await adc.adcImplantacao(
            newuser.usu,
            newuser.tipo,
            newuser.cliente,
            newuser.data,
            newuser.estado,
            newuser.cidade,
            newuser.obs,
            newuser.imp_contato,
            newuser.imp_tel,
            newuser.imp_tel1,
            newuser.imp_sis,
            newuser.imp_dtvenc,
            newuser.imp_mensalidade,
            newuser.imp_tel2,
            newuser.imp_tel3
          );
      
          // 2. Busca o telefone do usuário responsável
          const telefone = await adc.buscarTelefonePorId(newuser.usu);
      
          // 3. Monta a mensagem
          const mensagem = `
      Olá, você tem uma nova implantação!
      
      📋 Cliente: ${newuser.cliente}
      📅 Data: ${newuser.data}
      🔧 Tipo: ${newuser.tipo}
      📍 Local: ${newuser.cidade}, ${newuser.estado}
      👤 Nome: ${newuser.imp_contato}
      📞 Telefones: ${newuser.imp_tel}, ${newuser.imp_tel1}, ${newuser.imp_tel2 || '-'}, ${newuser.imp_tel3 || '-'}
      💻 Sistema: ${newuser.imp_sis}
      📝 Observações: ${newuser.obs || 'Nenhuma'}
      `;
      
          // 4. Envia a mensagem no WhatsApp
          const whatsappService = require('../services/whatsappService.js'); // ajuste o caminho se necessário
          await whatsappService.enviarMensagem(telefone, mensagem);
      
          res.send({ ok: true, msg: 'Implantação cadastrada e mensagem enviada com sucesso!' });
        } catch (erro) {
          console.error(erro);
          res.status(500).send({ erro: 'Erro ao cadastrar implantação ou enviar mensagem' });
        }
      }
      

}

module.exports = UsuarioController