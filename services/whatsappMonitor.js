// services/whatsappMonitor.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const db = require('../utils/database.js');
const QRCode = require('qrcode');
const conexao = new db();

class WhatsAppMonitor {
  constructor() {
    this.qrCode = null;
    this.client = new Client({
      authStrategy: new LocalAuth({ dataPath: './monitor-session' }),
      puppeteer: {
        headless: true,
        executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    });
    this.initialize();
  }

  initialize() {
    // Marcar callback como async para poder usar await dentro
    this.client.on('qr', async (qr) => {
      console.log('QR do Monitor:', qr);
      try {
        this.qrCode = await QRCode.toDataURL(qr);
      } catch (err) {
        console.error('Erro ao gerar QR Code:', err);
        this.qrCode = null;
      }
    });

    this.client.on('ready', () => {
      console.log('Monitor pronto');
      this.qrCode = null;
      this.startMessageListener();
    });

    this.client.on('disconnected', () => {
      console.log('Monitor desconectado');
      // Pode querer reinicializar o client aqui se quiser reconectar automaticamente
    });

    this.client.initialize();
  }

  getQRCode() {
    return this.qrCode;
  }

  async startMessageListener() {
    this.client.on('message_create', async (msg) => {
      if (msg.hasQuotedMsg && msg.from.includes('c.us')) {
        const quotedMsg = await msg.getQuotedMessage();
        await this.processResponse(quotedMsg.id._serialized, msg.body, msg.from);
      }
    });
  }

  async processResponse(originalMsgId, response, from) {
    try {
      const [mensagem] = await conexao.ExecutaComando(`
        SELECT * FROM mensagens_enviadas 
        WHERE whatsapp_id = ? LIMIT 1
      `, [originalMsgId]);

      if (mensagem && !mensagem.resposta_recebida) {
        const isConfirmed = response.match(/✅|SIM|CONFIRMO|sim|confirmo/i);

        await conexao.ExecutaComando(`
          UPDATE mensagens_enviadas SET
          resposta_recebida = ?,
          resposta_texto = ?,
          data_resposta = NOW()
          WHERE id = ?
        `, [isConfirmed ? 1 : 0, response, mensagem.id]);

        if (isConfirmed) {
          await this.notifyManager(mensagem.tecnico_id, from);
        }
      }
    } catch (error) {
      console.error('Erro ao processar resposta:', error);
    }
  }

  async notifyManager(tecnicoId, tecnicoPhone) {
    try {
      const [tecnico] = await conexao.ExecutaComando('SELECT usunome FROM Usuario WHERE usuid = ?', [tecnicoId]);
      const managerPhone = '18988043123'; // Felipe

      const mensagem = `✅ Confirmação Recebida\n\n` +
        `Técnico: ${tecnico.usunome}\n` +
        `WhatsApp: ${tecnicoPhone.replace('@c.us', '')}\n` +
        `Data: ${new Date().toLocaleString('pt-BR')}`;

      await this.client.sendMessage(`${managerPhone}@c.us`, mensagem);
    } catch (error) {
      console.error('Erro ao notificar gerente:', error);
    }
  }
}

module.exports = new WhatsAppMonitor();
