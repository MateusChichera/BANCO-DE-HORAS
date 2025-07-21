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

    this.client.on('disconnected', async () => {
      console.log('Monitor desconectado, tentando reiniciar...');
      await this.restartClient();
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
      const isConfirmed = response.match(/✅|👍|Beleza|Blz|Fecho|Combinado|SIM|CONFIRMO|Sim|Confirmo|Ok|ok|Confirmado|confirmado/i);
      console.log(`Resposta recebida: ${response} - Confirmada: ${isConfirmed}`);

      await conexao.ExecutaComando(`
        UPDATE mensagens_enviadas SET
        resposta_recebida = ?,
        resposta_texto = ?,
        data_resposta = NOW()
        WHERE id = ?
      `, [isConfirmed ? 1 : 0, response, mensagem.id]);

      // Só envia para o SSE se for confirmada
      if (isConfirmed) {
        console.log("id da mensagem:", mensagem.id);
        const [respostaDetalhada] = await conexao.ExecutaComando(`
          SELECT u.usuid, u.usunome, m.resposta_texto, m.data_resposta
          FROM Usuario u
          INNER JOIN mensagens_enviadas m ON u.usuid = m.tecnico_id
          WHERE m.id = ?
        `, [mensagem.id]);
          console.log('📦 Resultado do SELECT detalhado:', respostaDetalhada);
        if (respostaDetalhada) {
          const payload = {
            id: mensagem.id,
            novaConfirmacao: true,
            tecnico: respostaDetalhada.usunome,
            resposta: respostaDetalhada.resposta_texto,
            dataHora: respostaDetalhada.data_resposta,
          };

         /*clientesConectados.forEach(cliente => {
            cliente.write(`data: ${JSON.stringify(payload)}\n\n`);
          });*/
        }
      }
    }
  } catch (error) {
    console.error('Erro ao processar resposta:', error);
  }
}


 async VerifyResponse() {
    try {
     // console.log('🔍 Verificando respostas não visualizadas no banco de dados...');
      const mensagens = await conexao.ExecutaComando(`
        SELECT u.usuid, u.usunome, m.resposta_texto, m.data_resposta, m.id AS mensagem_id, m.resposta_vizualizada
        FROM Usuario u
        INNER JOIN mensagens_enviadas m ON u.usuid = m.tecnico_id
        WHERE m.resposta_recebida = 1 AND m.resposta_vizualizada = 0;
      `);

      if (mensagens.length > 0) {
       //console.log(`✅ ${mensagens.length} novas respostas encontradas.`);
        mensagens.forEach(mensagem => {
        //  console.log(`  - Técnico: ${mensagem.usunome} - Resposta: "${mensagem.resposta_texto}" - Data: ${new Date(mensagem.data_resposta).toLocaleString()}`);
        });
        return mensagens; // Retorna o array de mensagens
      } else {
       // console.log('Nenhuma nova resposta não visualizada encontrada.');
        return []; // Retorna um array vazio se não houver mensagens
      }
    } catch (error) {
      console.error('❌ Erro ao verificar respostas no banco:', error);
      throw error; // Re-lança o erro para que a controller possa capturá-lo
    }
  }

      async MarcarComoVisualizada(mensagemId) {
    try {
      console.log(`👁️ Marcando mensagem ${mensagemId} como visualizada.`);
      await conexao.ExecutaComando(`
        UPDATE mensagens_enviadas
        SET resposta_vizualizada = 1
        WHERE id = ?;
      `, [mensagemId]);
      console.log(`✅ Mensagem ${mensagemId} marcada como visualizada com sucesso.`);
      return { success: true };
    } catch (error) {
      console.error(`❌ Erro ao marcar mensagem ${mensagemId} como visualizada:`, error);
      throw error;
    }
  }

  /**
   * Reinicia o cliente do WhatsApp destruindo a instância atual
   * e criando uma nova, evitando múltiplos processos do Chromium.
   */
  async restartClient() {
    try {
      if (this.client) {
        await this.client.destroy();
      }
    } catch (err) {
      console.error('Erro ao destruir cliente:', err);
    }

    // Cria nova instância do Client
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

}

module.exports = new WhatsAppMonitor();
