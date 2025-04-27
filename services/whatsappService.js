// services/whatsappService.js
const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js'); // <- essa linha TEM que vir antes

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

// Envia a mensagem com garantia de que o cliente está pronto
async function enviarMensagem(numero, mensagem) {
  await esperarClientePronto();
  const numeroComDDD = `${numero}@c.us`;
  try {
    return await client.sendMessage(numeroComDDD, mensagem);
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
  enviarMensagem
};
