const express = require('express');
const process = require('process');
const ejsLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const path = require('path');
const LoginController = require("./controllers/loginController");
const autenticacaoMiddleware = require('./public/js/Login/Mid');
const cors = require('cors');

const app = express();
app.use(cookieParser());

app.use(session({
    secret: 'M1nH4Ch4v3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000 * 15
    }
}));

// Defina o caminho absoluto para as views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');

// LAYOUT E CSS
app.use(express.static("public/"))
app.use(ejsLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://152.67.45.250:3000', // ✅ origem exata do frontend
    credentials: true // ✅ permite enviar cookies
}));

// Rotas separadas
const HomeRoute = require('./routes/homeRoute');
const UsuarioRoute = require('./routes/usuarioRoute');
const LoginRoute = require('./routes/loginRoute');
const WhatsappRoute = require('./routes/whatsappRoute');

//Iniciando a rota de login
const loginRouteInstance = new LoginRoute();
const loginRouter = loginRouteInstance.getRouter();

// Iniciando a rota da home
const homeRouteInstance = new HomeRoute();
homeRouteInstance.initialize();

// Iniciando a rota dos usuários
const usuarioRouteInstance = new UsuarioRoute();
const usuarioRouter = usuarioRouteInstance.getRouter();

// Iniciando a rota do whatsapp
const whatsappRouteInstance = new WhatsappRoute();
const whatsappRouter = whatsappRouteInstance.getRouter(); // Renomeado para whatsappRouter

// LOGIN
app.use('/login', loginRouter); // Corrigido aqui para usar loginRouter em vez de LoginRouter
app.use('/', autenticacaoMiddleware, homeRouteInstance.getRouter());
app.use('/usuarios', autenticacaoMiddleware, usuarioRouter);
app.use('/whatsapp', autenticacaoMiddleware, whatsappRouter); // Corrigido para usar whatsappRouter

app.listen(process.env.port || 3000, () => {
    console.log("Servidor web iniciado na porta 3000");
});
