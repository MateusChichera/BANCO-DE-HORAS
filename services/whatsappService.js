// services/whatsappService.js
const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js'); // <- essa linha TEM que vir antes
const db = require('../utils/database.js')

const conexao = new db();

let qrCodeData = null;
let clientReady = false; // nova flag

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    executablePath: '/usr/bin/chromium-browser', // Caminho do Chromium no seu sistema
    args: ['--no-sandbox']
  }
});

client.on('qr', (qr) => {
  qrcode.toDataURL(qr, (err, url) => {
    if (err) {
      console.error('Erro ao gerar o QR Code:', err);
      return;
    }
    qrCodeData = url;
  });
});

client.on('ready', () => {
  console.log('✅ WhatsApp conectado');
  clientReady = true;
});

client.initialize();

// Espera até o cliente estar pronto
function esperarClientePronto() {
  if (clientReady) return Promise.resolve();
  return new Promise((resolve) => {
    const intervalo = setInterval(() => {
      if (clientReady) {
        clearInterval(intervalo);
        resolve();
      }
    }, 500);
  });
}

 async function VizualizarMensagem(whatsappId) {
  try {
     await conexao.ExecutaComando(`
      UPDATE mensagens_enviadas
      SET resposta_vizualizada = 1
      WHERE whatsapp_id = ?
    `, [whatsappId]);
    return true;
  } catch (error) {
    console.error('Erro ao atualizar a vizualização da mensagem:', error);
    throw error;
  }
 }

// Envia a mensagem com garantia de que o cliente está pronto
async function enviarMensagem(numero, mensagem, tecnicoId = null) {
  await esperarClientePronto();
  const numeroComDDD = `${numero}@c.us`;
  try {
    const sentMsg = await client.sendMessage(numeroComDDD, mensagem);
    
    // Registrar no banco (se for mensagem de agendamento)
    if (tecnicoId) {
      await conexao.ExecutaComando(`
        INSERT INTO mensagens_enviadas 
        (tecnico_id, whatsapp_id, mensagem_texto) 
        VALUES (?, ?, ?)
      `, [tecnicoId, sentMsg.id._serialized, mensagem]);
    }
    
    return sentMsg;
  } catch (erro) {
    console.error('Erro ao enviar mensagem:', erro);
    throw erro;
  }
}

async function getQRCode() {
  if (!qrCodeData) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (qrCodeData) {
          clearInterval(interval);
          resolve(qrCodeData);
        }
      }, 500);

      // Adicionar um tempo limite para evitar espera indefinida
      setTimeout(() => {
        clearInterval(interval);
        reject('Erro: QR Code não gerado no tempo esperado');
      }, 60000); // Espera 1 minuto (60,000ms)
    });
  }
  return qrCodeData;
}


module.exports = {
  getQRCode,
  enviarMensagem,
  VizualizarMensagem
};
