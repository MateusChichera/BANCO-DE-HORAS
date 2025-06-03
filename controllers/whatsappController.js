const whatsappService = require('../services/whatsappService.js');
const whatsappServiceMonitor = require('../services/whatsappMonitor.js'); 

class WhatsappController {
  async gerarQRCode(req, res) {
    const qrCode = await whatsappService.getQRCode();
    if (qrCode) {
      res.render('whatsapp/qrcode', { qrCode });
    } else {
      res.send("Aguardando geração do QR Code...");
    }
  }
  async VerificarResposta(req, res) {
    try {
      
      const mensagens = await whatsappServiceMonitor.VerifyResponse();
      
      res.json({ status: 'ok', mensagem: 'Confirmações encontradas!', mensagens });
    } catch (error) {
      
      console.error('❌ Erro ao verificar resposta na controller:', error);
     
      res.status(500).json({ status: 'error', mensagem: 'Erro ao verificar resposta', error: error.message });
    }
  }

  async getQRCodeImage(req, res) {
    const qrCode = await whatsappService.getQRCode();
    if (qrCode) {
      const base64Data = qrCode.replace(/^data:image\/png;base64,/, '');
      const imgBuffer = Buffer.from(base64Data, 'base64');
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': imgBuffer.length
      });
      res.end(imgBuffer);
    } else {
      res.status(404).send("QR Code ainda não gerado.");
    }
  }

  async getQRCodeImageMonitor(req, res) {

    const qrCode = await whatsappServiceMonitor.getQRCode();
    if (qrCode) {
      const base64Data = qrCode.replace(/^data:image\/png;base64,/, '');
      const imgBuffer = Buffer.from(base64Data, 'base64');
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': imgBuffer.length
      });
      res.end(imgBuffer);
    } else {
      res.status(404).send("QR Code ainda não gerado.");
    }
  }

  async enviarMensagem(req, res) {
    const { numero, mensagem } = req.body;

    if (!numero || !mensagem) {
      return res.status(400).json({ erro: 'Número e mensagem são obrigatórios' });
    }

    try {
      await whatsappService.enviarMensagem(numero, mensagem);
      res.json({ status: 'ok', mensagem: 'Mensagem enviada com sucesso!' });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao enviar mensagem', detalhes: erro });
    }
  }

  async MarcarNotificacaoComoLida(req, res) {
    const { mensagemId } = req.body;
    if (!mensagemId) {
      return res.status(400).json({ status: 'error', mensagem: 'ID da mensagem não fornecido.' });
    }
    try {

      await whatsappServiceMonitor.MarcarComoVisualizada(mensagemId);
      res.json({ status: 'ok', mensagem: `Mensagem ${mensagemId} marcada como visualizada.` });
    } catch (error) {
      console.error('❌ Erro ao marcar notificação como lida na controller:', error);
      res.status(500).json({ status: 'error', mensagem: 'Erro ao marcar notificação como lida', error: error.message });
    }
  }
}

module.exports = WhatsappController;

