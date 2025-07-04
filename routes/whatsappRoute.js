// routes/whatsappRoute.js
const express = require('express');
const WhatsappController = require('../controllers/whatsappController.js');

class WhatsappRoute {
  constructor() {
    this.router = express.Router();
    this.controller = new WhatsappController();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get('/qrcode', this.controller.gerarQRCode);
    this.router.post('/enviar', this.controller.enviarMensagem);
    this.router.get('/qrcode-img', this.controller.getQRCodeImage);
    this.router.get('/qrcode-img-monitor', this.controller.getQRCodeImageMonitor);
    this.router.get('/notificacoes', this.controller.VerificarResposta);
    this.router.post('/notificacoes/visualizada', this.controller.MarcarNotificacaoComoLida);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = WhatsappRoute;
