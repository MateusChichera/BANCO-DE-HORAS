const Database = require('../utils/database');
const crypto = require('crypto');

const conexao = new Database();

// Ideal: coloque essa chave no .env
const ENCRYPTION_KEY = process.env.EMAIL_ENCRYPTION_KEY || '1234567890abcdef1234567890abcdef'; 
const IV_LENGTH = 16;

function criptografar(texto) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(texto, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function descriptografar(textoCriptografado) {
  const [ivHex, encrypted] = textoCriptografado.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

class EmailModel {
  async gravar(config) {
    const sql = `
      INSERT INTO config_email (usuid, smtp_host, smtp_port, smtp_user, smtp_pass, from_email, from_name, use_tls, use_ssl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
      config.usuid,
      config.smtp_host,
      config.smtp_port,
      config.smtp_user,
      criptografar(config.smtp_pass),
      config.from_email,
      config.from_name,
      config.use_tls ?? true,
      config.use_ssl ?? false,
    ];
    console.log("dentro da gravar email");
    console.log(valores);
    return conexao.ExecutaComando(sql, valores);
  }

  async listarPorUsuario(usuid) {
    const sql = `SELECT * FROM config_email WHERE usuid = ? AND ativo = true`;
    const resultados = await conexao.ExecutaComando(sql, [usuid]);

    return resultados.map(cfg => ({
      ...cfg,
      smtp_pass: descriptografar(cfg.smtp_pass)
    }));
  }
}

module.exports = new EmailModel();
