const crypto = require('crypto');

// Função para gerar o hash
function gerarHash(userId) {
    const chaveSecreta = 'minhaChaveSuperSecreta';  // Use uma chave secreta para maior segurança
    const hash = crypto.createHmac('sha256', chaveSecreta)
                       .update(userId.toString())
                       .digest('hex');
    return hash;
}

module.exports = { gerarHash };
