// services/monitorScheduler.js
const whatsappMonitor = require('./whatsappMonitor');
const cron = require('node-cron');

// Verifica conexão a cada 30 minutos
cron.schedule('*/30 * * * *', () => {
  if (!whatsappMonitor.client.connected) {
    console.log('Reiniciando monitor...');
    whatsappMonitor.client.initialize();
  }
});

console.log('Agendador de monitoramento iniciado');