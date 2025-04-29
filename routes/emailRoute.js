const express = require('express');
const EmailController = require('../controllers/emailController');

class EmailRoute {
    #router;

    constructor() {
        this.#router = express.Router();
        this.initialize(); // <- Isso é essencial
    }

    getRouter() {
        return this.#router;
    }

    initialize() {
        console.log("dentro do emailRoute");
        const ctrl = EmailController; 
   
        this.#router.post('/enviar', ctrl.enviarEmail);
        this.#router.post('/email', ctrl.cadastrar); // Aqui está o método POST
        this.#router.get('/email/config/:usuid', ctrl.buscarPorUsuario); // Rota GET
    }
    
}

module.exports = EmailRoute;
