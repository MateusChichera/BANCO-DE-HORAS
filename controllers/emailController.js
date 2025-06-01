const EmailModel = require('../models/emailModel');
const nodemailer = require('nodemailer');


const emailController = {
    async enviarEmail(req, res) {
        try {
            const { to, subject, html } = req.body;
            const usuid = req.usuario?.id || req.body.usuid;
          
        
            const configs = await EmailModel.listarPorUsuario(usuid);
        
            if (!configs.length) {
              return res.status(404).json({ erro: 'Configuração de e-mail não encontrada.' });
            }
        
            const cfg = configs[0];
        
            const transporter = nodemailer.createTransport({
              host: cfg.smtp_host,
              port: cfg.smtp_port,
              secure: cfg.use_ssl,
              auth: {
                user: cfg.smtp_user,
                pass: cfg.smtp_pass
              },
              tls: {
                rejectUnauthorized: !cfg.use_tls
              }
            });
        
            const info = await transporter.sendMail({
                from: `"${cfg.from_name}" <${cfg.from_email}>`,
                to,
                subject,
                html
              });
              
              console.log('E-mail enviado:', info);
              
        
            res.json({ mensagem: 'E-mail enviado com sucesso.' });
          } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            res.status(500).json({ erro: 'Erro ao enviar e-mail.' });
          }
        },

  async cadastrar(req, res) {
    try {
        console.log("dentro do cadastrar email");
      const resultado = await EmailModel.gravar(req.body);
      res.status(201).json({ mensagem: 'Configuração salva com sucesso!', resultado });
    } catch (erro) {
      console.error('Erro ao salvar e-mail:', erro);
      res.status(500).json({ erro: 'Erro ao salvar configuração de e-mail' });
    }
  },

  async buscarPorUsuario(req, res) {
    try {
      const usuid = req.params.usuid;
      const resultado = await EmailModel.listarPorUsuario(usuid);
      res.status(200).json(resultado);
    } catch (erro) {
      console.error('Erro ao buscar e-mails:', erro);
      res.status(500).json({ erro: 'Erro ao buscar configuração de e-mail' });
    }
  }
};

module.exports = emailController;
