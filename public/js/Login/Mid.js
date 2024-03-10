const express = require('express');
const router = express.Router();

function autenticacaoMiddleware(req, res, next) {
    // Verifica se o ID do usuário está presente nos cookies
    const userId = req.cookies.userId;
    const nome = req.cookies.Nome
    if (userId) {
        // ID do usuário encontrado, permitir a continuação da requisição
        res.cookie('userId', userId, { maxAge: 15 * 60 * 1000 });
        res.cookie('Nome', nome, { maxAge: 15 * 60 * 1000 }); // definindo o cookies para durar no maximo 15 minutos
        console.log("ID DO USUARIO LOGADO E NOME: ",userId,nome);
        next();
    } else {
        // ID do usuário não encontrado, redirecionar para a página de login
        res.redirect('/login');
    }
}

module.exports = autenticacaoMiddleware;
