const express = require('express');
const LoginController = require('../controllers/loginController');

class LoginRoute {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        const ctrl = new LoginController();
        this.router.get('/', ctrl.indexView);
        this.router.post('/', ctrl.autenticar);
    }

    // Certifique-se de que o método getRouter está definido corretamente
    getRouter() {
        return this.router;
    }
}

module.exports = LoginRoute;
