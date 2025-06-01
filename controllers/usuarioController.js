const UsuarioModel = require("../models/usuarioModel");
const express = require('express');
const app = express();
const moment = require('moment');
const Database = require('../utils/database')
const { calcularDistancia } = require('./calculardistancia.js'); 
const axios = require('axios');
const { consoleLog } = require("@ngrok/ngrok");

const conexao = new Database();


class UsuarioController {

    //CALENDARIO
    // Busca implantações para exibição em calendário


async buscarCalendario(req, res) {
    try {
        const diaInicio = req.query.dia;
        const diaFim = req.query.dia2;

        if (diaInicio && diaFim) {
            const usuarioModel = new UsuarioModel();
            const resultado = await usuarioModel.buscacalendario(diaInicio, diaFim);

            res.send({
                ok: true,
                msg: "Implantações encontradas com sucesso.",
                calendario: resultado
            });
        } else {
            res.send({ ok: false, msg: "Informe o id, dia e dia2 para buscar o calendário." });
        }
    } catch (error) {
        console.error("Erro ao buscar implantações para o calendário:", error);
        res.send({ ok: false, msg: "Erro ao buscar implantações no banco de dados." });
    }
}

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



    async listarViagens(req,res){
        res.render('Usuario/viagens')
    }
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
        res.render('Usuario/editar', { userId });  // Passa só o id (se quiser)
    }
    

    //BUSCAR DETALHES DAS  HORAS

    async buscarDetalhes(req, res) {
        console.log("Método buscarDetalhes chamado.");
        const userId = req.params.id;
        console.log("ID do usuário:", userId);
    
        try {
            const usuarioModel = new UsuarioModel();
            const detalhes = await usuarioModel.buscaid(userId);
            console.log("Detalhes recuperados:", detalhes);
            res.json({ ok: true, detalhes });
        } catch (error) {
            console.error('Erro ao buscar detalhes:', error);
            res.json({ ok: false, msg: 'Erro ao buscar detalhes do usuário.' });
        }
    }
    

    editarimplantacaoView(req, res) {
        res.render('Usuario/editarImplantacoes');
    }

    // IMPORTAR VIEW
    importarView(req, res) {
        console.log("Método importarView chamado.");
        res.render('Usuario/importar');
    };
    
    editarImpView(req, res) {
        console.log("Método editarImpView chamado.");
        const userId = req.params.id;
    
        // Chame a função do modelo para buscar detalhes com base no ID
        const usuarioModel = new UsuarioModel();
        usuarioModel.buscaidImp(userId)
            .then(detalhes => {
                // Renderize a view e envie os detalhes para o front-end
                console.log("Detalhes recuperados:", detalhes);
                res.json({ userId, detalhes });  // Aqui retornamos JSON
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

            res.send({ok: true, msg: "Horas excluidas!"})
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

    //CADASTRO DE IMPLANTAÇÃO E ENVIO DE MENSAGEM

    async implantacoes(req, res) {
        const adc = new UsuarioModel();
        const newuser = {
          usu: req.body.usu,
          carro: req.body.carro,
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
          imp_tel3: req.body.tel3,
          vendedor: req.body.vendedor,
          dia1: req.body.dia1,
          taxa: req.body.taxa
        };
        console.log("Dados recebidos para cadastro de implantação:", newuser);
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
            newuser.imp_tel3,
            newuser.carro,
            newuser.vendedor,
            newuser.dia1,
            newuser.taxa
          );
          let dataFormatada = (() => {
            const dataObj = new Date(newuser.data);
            const dia = String(dataObj.getDate()).padStart(2, '0');
            const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
            const ano = dataObj.getFullYear();
            return `${dia}/${mes}/${ano}`;
          })();
          let data2 = (() => {
            const dataObj = new Date(newuser.dia1);
            const dia = String(dataObj.getDate()).padStart(2, '0');
            const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
            const ano = dataObj.getFullYear();
            return `${dia}/${mes}/${ano}`;
          })();
          const usuario = await adc.buscarTelefonePorId(newuser.usu);

          const telefone = usuario.usu_tel;
          const tecnico = usuario.usunome;
          console.log("telefone a enviar mensagem no cadastro de implantacao",telefone)
          const periodo = data2 ? `📅 Período: ${dataFormatada} a ${data2}` : `📅 Data: ${dataFormatada}`;
          const taxaImplantacao = newuser.taxa ? `💰 Taxa de implantação: R$${newuser.taxa}` : '';

          // 3. Monta a mensagem
          const mensagem = `Olá,${tecnico} você tem uma nova implantação!\n\n📋 Cliente: ${newuser.cliente}
        ${periodo}
        🔧 Tipo: ${newuser.tipo}
        📍 Local: ${newuser.cidade}, ${newuser.estado}
        🚗 Carro: ${newuser.carro}
        👤 Nome: ${newuser.imp_contato}
        📞 Telefones: ${newuser.imp_tel}, ${newuser.imp_tel1}, ${newuser.imp_tel2 || '-'}, ${newuser.imp_tel3 || '-'}
        💻 Conversão: ${newuser.imp_sis}
        ${taxaImplantacao}
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


                    ///MENSAGEM PARA O VENDEDOR E FERNANDO ---------------------------------------------------------------------------------------

        (async () => {
            try {
                let dataFormatada = (() => {
                    if (!newuser.data) return null;
                    const dataObj = new Date(newuser.data);
                    if (isNaN(dataObj)) return null;
                    const dia = String(dataObj.getDate()).padStart(2, '0');
                    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
                    const ano = dataObj.getFullYear();
                    return `${dia}/${mes}/${ano}`;
                  })();
                  
                  let data2 = (() => {
                    if (!newuser.dia1) return null;
                    const dataObj = new Date(newuser.dia1);
                    if (isNaN(dataObj)) return null;
                    const dia = String(dataObj.getDate()).padStart(2, '0');
                    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
                    const ano = dataObj.getFullYear();
                    return `${dia}/${mes}/${ano}`;
                  })();
                  const usuario = await adc.buscarTelefonePorId(newuser.usu);
                  const tecnico = usuario.usunome;

                  const periodo = data2 ? `📅 Período: ${dataFormatada} a ${data2}` : `📅 Data: ${dataFormatada}`;
                  const taxaImplantacao = newuser.taxa ? `💰 Taxa de implantação: R$${newuser.taxa}` : '';

                const mensagem = `Olá, nova implantação agendada!\n\n📋 Cliente: ${newuser.cliente}
        ${periodo}
        🔧 Tipo: ${newuser.tipo}
        📍 Local: ${newuser.cidade}, ${newuser.estado}
        🚗 Carro: ${newuser.carro}
        👤 Nome: ${newuser.imp_contato}
        📞 Telefones: ${newuser.imp_tel}, ${newuser.imp_tel1}, ${newuser.imp_tel2 || '-'}, ${newuser.imp_tel3 || '-'}
        💻 Conversão: ${newuser.imp_sis}
        👤 Tecnico: ${tecnico} 
        ${taxaImplantacao}
        📝 Observações: ${newuser.obs || 'Nenhuma'}
      `;
              const whatsappService = require('../services/whatsappService.js');
        
              // Buscar telefone do vendedor
              console.log("ID do vendedor:", newuser.vendedor);

              const vendedo = await adc.buscarTelefonePorId(newuser.vendedor);
              const telefoneV = vendedo.usu_tel;

              console.log("Telefone do vendedor:", telefoneV);
              const telefoneF = '5518981174107'; // Fernando
              const telefoneT = '5518981760014'; //felipe
        
              // função auxiliar para esperar um tempo
              const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        
              // Atraso aleatório entre 1 e 20 segundos
              const delayFelipe = Math.floor(Math.random() * 20000) + 1000; // 1 a 20 segundos
              const delayVendedor = Math.floor(Math.random() * 20000) + 1000; 
              const delayFernando = Math.floor(Math.random() * 20000) + 1000;
        
              // Dispara os envios de forma independente
              setTimeout(() => {
                whatsappService.enviarMensagem(telefoneV, mensagem)
                  .then(() => console.log(`Mensagem enviada para vendedor ${telefoneV}`))
                  .catch(err => console.error('Erro ao enviar para vendedor:', err));
              }, delayVendedor);
        
              setTimeout(() => {
                whatsappService.enviarMensagem(telefoneF, mensagem)
                  .then(() => console.log(`Mensagem enviada para Fernando ${telefoneF}`))
                  .catch(err => console.error('Erro ao enviar para Felipe:', err));
              }, delayFernando);
              setTimeout(() => {
                whatsappService.enviarMensagem(telefoneT, mensagem)
                  .then(() => console.log(`Mensagem enviada para Felipe ${telefoneT}`))
                  .catch(err => console.error('Erro ao enviar para Felipe:', err));
              }, delayFelipe);
        
            } catch (erro) {
              console.error('Erro ao tentar enviar mensagens adicionais:', erro);
            }
          })();
      }
      //RELATORIO VIAGENS

    async Viagens(req,res){
        try {
            const diaInicio = req.query.dia;
            const diaFim = req.query.dia2;
    
            // Verifique se todas as informações necessárias estão presentes
            if (diaInicio && diaFim) {
                const usuarioModel = new UsuarioModel();
                const implantacao = await usuarioModel.relViagem(diaInicio, diaFim);
    
                res.json({
                    ok: true,
                    msg: "Agendamentos encontrados com sucesso.",
                    implantacao: implantacao,
                });
            } else {
                res.send({ ok: false, msg: "Por favor, forneça todas as informações necessárias para a pesquisa." });
            }
        } catch (error) {
            console.error("Erro ao buscar horas:", error);
            res.send({ ok: false, msg: "Erro ao buscar agendamentos no banco de dados." });
        }
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Nova função para cadastrar implantações em massa
async implantacoesEmMassa(req, res) {
  const agendamentos = req.body; // O frontend enviará um array de agendamentos

  if (!Array.isArray(agendamentos) || agendamentos.length === 0) {
    return res.status(400).send({ erro: 'Nenhum agendamento fornecido para cadastro em massa.' });
  }

  const resultados = [];
  const erros = [];

  for (const newuser of agendamentos) {
    const adc = new UsuarioModel();
    try {
      // --- INÍCIO DA MUDANÇA: Formatar datas para o SQL ---

      // Função auxiliar para formatar DD/MM/YYYY para YYYY-MM-DD
      const formatarDataParaSQL = (dataStr) => {
        if (!dataStr) return null; // Retorna null para datas vazias (ou undefined, dependendo do seu DB schema)
        const partes = dataStr.split('/');
        if (partes.length === 3) {
          return `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
        }
        return null; // Retorna null se o formato não for o esperado
      };

      const impDiaSQL = formatarDataParaSQL(newuser.data);
      const impDia1SQL = formatarDataParaSQL(newuser.dia1);

      // --- FIM DA MUDANÇA ---

      // 1. Grava a implantação
      await adc.adcImplantacao(
        newuser.usu,
        newuser.tipo,
        newuser.cliente,
        impDiaSQL, // Usar a data formatada para SQL
        newuser.estado,
        newuser.cidade,
        newuser.obs,
        newuser.imp_contato,
        newuser.imp_tel,
        newuser.imp_tel1,
        newuser.imp_sis,
        newuser.imp_dtvenc, // Assumindo que imp_dtvenc já vem no formato correto ou pode ser string vazia
        newuser.imp_mensalidade, // Assumindo que imp_mensalidade já vem no formato correto ou pode ser string vazia
        newuser.imp_tel2,
        newuser.imp_tel3,
        newuser.carro,
        newuser.vendedor,
        impDia1SQL, // Usar a data formatada para SQL
        newuser.taxa
      );

      // Lógica de formatação de datas e montagem da mensagem do WhatsApp
      // (Esta parte pode continuar usando o formato DD/MM/YYYY se for o que o WhatsApp espera)
      let dataFormatada = '';
      if (newuser.data) {
        const dataObj = new Date(newuser.data.split('/').reverse().join('-') + 'T00:00:00'); // Converte para YYYY-MM-DD
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        dataFormatada = `${dia}/${mes}/${ano}`;
      }

      let data2Formatada = '';
      if (newuser.dia1) {
        const dataObj = new Date(newuser.dia1.split('/').reverse().join('-') + 'T00:00:00'); // Converte para YYYY-MM-DD
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        data2Formatada = `${dia}/${mes}/${ano}`;
      }

      const usuario = await adc.buscarTelefonePorId(newuser.usu);
      const telefone = usuario ? usuario.usu_tel : null;
      const tecnico = usuario ? usuario.usunome : 'Técnico Desconhecido';

      const periodo = data2Formatada ? `📅 Período: ${dataFormatada} a ${data2Formatada}` : `📅 Data: ${dataFormatada}`;
      const taxaImplantacao = newuser.taxa ? `💰 Taxa de implantação: R$${newuser.taxa}` : '';

      const mensagem = `Olá, ${tecnico} você tem uma nova implantação!\n\n📋 Cliente: ${newuser.cliente}\n${periodo}\n🔧 Tipo: ${newuser.tipo}\n📍 Local: ${newuser.cidade}, ${newuser.estado}\n🚗 Carro: ${newuser.carro}\n👤 Nome: ${newuser.imp_contato}\n📞 Telefones: ${newuser.imp_tel}, ${newuser.imp_tel1}, ${newuser.imp_tel2 || '-'}, ${newuser.imp_tel3 || '-'}\n💻 Conversão: ${newuser.imp_sis}\n${taxaImplantacao}\n📝 Observações: ${newuser.obs || 'Nenhuma'}`;
    const whatsappService = require('../services/whatsappService.js');
      if (telefone) {
        await whatsappService.enviarMensagem(telefone, mensagem);
        resultados.push({ cliente: newuser.cliente, status: 'sucesso', mensagem: 'Cadastrado e mensagem enviada' });
      } else {
        resultados.push({ cliente: newuser.cliente, status: 'aviso', mensagem: 'Cadastrado, mas telefone do técnico não encontrado para enviar mensagem' });
      }
    } catch (erro) {
      console.error(`Erro ao processar agendamento para o cliente ${newuser.cliente}:`, erro);
      erros.push({ cliente: newuser.cliente, status: 'erro', mensagem: erro.message });
    }
  }

  if (erros.length > 0) {
    res.status(207).send({ // 207 Multi-Status indica que algumas operações falharam
      msg: 'Processamento em massa concluído com alguns erros.',
      resultados: resultados,
      erros: erros
    });
  } else {
    res.send({ ok: true, msg: 'Todos os agendamentos foram cadastrados e mensagens enviadas com sucesso!', resultados: resultados });
  }
}






    // ATUALIZAR IMPLANTAÇÃO 

    async atualizarImplantacao(req, res) {
        console.log("atualizando implantação na controller");
    
        const adc = new UsuarioModel();
        const id = req.params.id;
      
        const dadosAtualizados = {
          usu: req.body.usu,
          carro: req.body.carro,
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
          imp_tel3: req.body.tel3,
          vendedor: req.body.vendedor,
          dia1: req.body.dia1,
          taxa: req.body.taxa
        };
      
        try {
            const resultado = await adc.atualizarImplantacao(id, dadosAtualizados);
          
            if (resultado.affectedRows === 0) {
              return res.status(404).send({ erro: 'Implantação não encontrada' });
            }
          
            let dataFormatadaT = (() => {
                if (!dadosAtualizados.data) return null;
                const dataObj = new Date(dadosAtualizados.data);
                if (isNaN(dataObj)) return null;
                const dia = String(dataObj.getDate()).padStart(2, '0');
                const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
                const ano = dataObj.getFullYear();
                return `${dia}/${mes}/${ano}`;
              })();
              
              let data2 = (() => {
                if (!dadosAtualizados.dia1) return null;
                const dataObj = new Date(dadosAtualizados.dia1);
                if (isNaN(dataObj)) return null;
                const dia = String(dataObj.getDate()).padStart(2, '0');
                const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
                const ano = dataObj.getFullYear();
                return `${dia}/${mes}/${ano}`;
              })();
              
              const usuario = await adc.buscarTelefonePorId(dadosAtualizados.usu);

              const telefone = usuario.usu_tel;
              const tecnico = usuario.usunome;
              console.log("telefone a enviar mensagem na alteração de implantacao",telefone)
              const periodo = data2 ? `📅 Período: ${dataFormatadaT} a ${data2}` : `📅 Data: ${dataFormatadaT}`;
              const taxaImplantacao = dadosAtualizados.taxa ? `💰 Taxa de implantação: R$${dadosAtualizados.taxa}` : '';
    
            const mensagem = `🚨 Alteração na sua implantação!\n\n📋 Cliente: ${dadosAtualizados.cliente}
            ${periodo}
          🔧 Tipo: ${dadosAtualizados.tipo}
          📍 Local: ${dadosAtualizados.cidade}, ${dadosAtualizados.estado}
          🚗 Carro: ${dadosAtualizados.carro}
          👤 Nome: ${dadosAtualizados.imp_contato}
          📞 Telefones: ${dadosAtualizados.imp_tel}, ${dadosAtualizados.imp_tel1}, ${dadosAtualizados.imp_tel2 || '-'}, ${dadosAtualizados.imp_tel3 || '-'}
          💻 Conversão: ${dadosAtualizados.imp_sis}
          ${taxaImplantacao}
          📝 Observações: ${dadosAtualizados.obs || 'Nenhuma'}
          `;

          //console.log("Mensagem a ser enviada:\n", mensagem);
            const whatsappService = require('../services/whatsappService.js');
            await whatsappService.enviarMensagem(telefone, mensagem);
          
            res.send({ ok: true, msg: 'Implantação atualizada e mensagem enviada com sucesso!' });
          
          } catch (erro) {
            console.error("Erro no processo de atualização ou envio de mensagem:", erro);
          
            if (!res.headersSent) {
              res.status(500).send({ erro: 'Erro ao atualizar implantação ou enviar mensagem' });
            }
          }

          (async () => {
            try {   
                console.log("Chamando a função de mensagem para o vendedor e Fernando");
                let dataFormatada = (() => {
                    const dataObj = new Date(dadosAtualizados.data);
                    const dia = String(dataObj.getDate()).padStart(2, '0');
                    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
                    const ano = dataObj.getFullYear();
                    return `${dia}/${mes}/${ano}`;
                  })();
                  let data2 = (() => {
                    const dataObj = new Date(dadosAtualizados.dia1);
                    const dia = String(dataObj.getDate()).padStart(2, '0');
                    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
                    const ano = dataObj.getFullYear();
                    return `${dia}/${mes}/${ano}`;
                  })();
                  const usuario = await adc.buscarTelefonePorId(dadosAtualizados.usu);
                  const tecnico = usuario.usunome;

                  const periodo = data2 ? `📅 Período: ${dataFormatada} a ${data2}` : `📅 Data: ${dataFormatada}`;
                  const taxaImplantacao = dadosAtualizados.taxa ? `💰 Taxa de implantação: R$${dadosAtualizados.taxa}` : '';

                const mensagem = `Olá, houve uma alteração na implantação!\n\n📋 Cliente: ${dadosAtualizados.cliente}
        ${periodo}
        🔧 Tipo: ${dadosAtualizados.tipo}
        📍 Local: ${dadosAtualizados.cidade}, ${dadosAtualizados.estado}
        🚗 Carro: ${dadosAtualizados.carro}
        👤 Nome: ${dadosAtualizados.imp_contato}
        📞 Telefones: ${dadosAtualizados.imp_tel}, ${dadosAtualizados.imp_tel1}, ${dadosAtualizados.imp_tel2 || '-'}, ${dadosAtualizados.imp_tel3 || '-'}
        💻 Conversão: ${dadosAtualizados.imp_sis}
        👤 Tecnico: ${tecnico} 
        ${taxaImplantacao}
        📝 Observações: ${dadosAtualizados.obs || 'Nenhuma'}
      `;
              const whatsappService = require('../services/whatsappService.js');
        
              // Buscar telefone do vendedor
              console.log("ID do vendedor:", dadosAtualizados.vendedor);

              const vendedo = await adc.buscarTelefonePorId(dadosAtualizados.vendedor);
              const telefoneV = vendedo.usu_tel;

              console.log("Telefone do vendedor:", telefoneV);
              const telefoneF = '5518981174107'; // Fernando
              const telefoneT = '5518981760014'; // Telefone do felipe
        
              // função auxiliar para esperar um tempo
              const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        
              // Atraso aleatório entre 1 e 20 segundos
              const delayFelipe = Math.floor(Math.random() * 20000) + 1000;
              const delayVendedor = Math.floor(Math.random() * 20000) + 1000; 
              const delayFernando = Math.floor(Math.random() * 20000) + 1000;
        
              // Dispara os envios de forma independente
              setTimeout(() => {
                whatsappService.enviarMensagem(telefoneV, mensagem)
                  .then(() => console.log(`Mensagem enviada para vendedor ${telefoneV}`))
                  .catch(err => console.error('Erro ao enviar para vendedor:', err));
              }, delayVendedor);
        
              setTimeout(() => {
                whatsappService.enviarMensagem(telefoneF, mensagem)
                  .then(() => console.log(`Mensagem enviada para Fernando ${telefoneF}`))
                  .catch(err => console.error('Erro ao enviar para Fernando:', err));
              }, delayFernando);
              setTimeout(() => {
                whatsappService.enviarMensagem(telefoneT, mensagem)
                  .then(() => console.log(`Mensagem enviada para Felipe ${telefoneT}`))
                  .catch(err => console.error('Erro ao enviar para Fernando:', err));
              }, delayFelipe);
        
            } catch (erro) {
              console.error('Erro ao tentar enviar mensagens adicionais:', erro);
            }
          })();
          
      }

       deletarImp(req, res) {
        console.log("Chamando a funçao de deletar")
            const exc = new UsuarioModel();
            
            if(req.body.id != ""){
                exc.deletarImplantacao(req.body.id)
    
                res.send({ok: true, msg: "Implantacao excluída!"})
            }
            else{
                res.send({ok: false, msg: "Dados inválidos!"})
            }
      
      }
      
      


}

module.exports = UsuarioController