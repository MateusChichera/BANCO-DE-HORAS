// services/whatsappService.js
const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');

let qrCodeData = null;

const client = new Client({
  authStrategy: new LocalAuth(), // Salva a sessão automaticamente
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  }
});

// Evento que captura o QR Code gerado
client.on('qr', (qr) => {
  qrcode.toDataURL(qr, (err, url) => {
    if (err) {
      console.error('Erro ao gerar o QR Code:', err);
      return;
    }
    qrCodeData = url;
  });
});

// Evento quando o cliente do WhatsApp Web está pronto
client.on('ready', () => {
  console.log('✅ WhatsApp conectado');
});

// Inicializa o cliente
client.initialize();

// Função que retorna o QR Code
async function getQRCode() {
  // Aguarda até que o QR Code esteja disponível
  if (!qrCodeData) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (qrCodeData) {
          clearInterval(interval);
          resolve(qrCodeData);
        }
      }, 500); // Verifica a cada 500ms se o QR Code está pronto
    });
  }
  return qrCodeData;
}

// Função para enviar mensagem
async function enviarMensagem(numero, mensagem) {
  const numeroComDDD = `${numero}@c.us`;
  return client.sendMessage(numeroComDDD, mensagem);
}

module.exports = {
  getQRCode,
  enviarMensagem
};
