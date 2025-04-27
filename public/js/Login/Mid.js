const crypto = require('crypto');

// Função para gerar o hash do userId
function gerarHash(userId) {
    const chaveSecreta = 'minhaChaveSuperSecreta';  // Mesma chave secreta
    return crypto.createHmac('sha256', chaveSecreta)
                 .update(userId.toString())
                 .digest('hex');
}

function autenticacaoMiddleware(req, res, next) {
    // Obtém o userId e o hash armazenado no cookie
    const userId = req.cookies.userId;
    const userHash = req.cookies.userHash;

    if (userId && userHash) {
        // Gerando o hash esperado com base no userId
        const expectedHash = gerarHash(userId);

        // Verifica se o hash do cookie corresponde ao hash esperado
        if (userHash === expectedHash) {
            console.log("Usuário autenticado com sucesso");
            next(); // O usuário está autenticado, continua a requisição
        } else {
            console.log("Hash inválido. Autenticação falhou.");
            res.redirect('/login');  // Redireciona para a página de login
        }
    } else {
        console.log("userId ou userHash não encontrados nos cookies.");
        res.redirect('/login');  // Redireciona para a página de login
    }
}

module.exports = autenticacaoMiddleware;
