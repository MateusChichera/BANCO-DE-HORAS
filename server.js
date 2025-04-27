const express = require('express');
const process = require('process');
const ejsLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const path = require('path');
const LoginController = require("./controllers/loginController");
const autenticacaoMiddleware = require('./public/js/Login/Mid');
const cors = require('cors');
const statusMonitor = require('express-status-monitor');

// Habilita o monitor


const app = express();


app.use(statusMonitor());
app.use(statusMonitor({ title: 'Monitoramento do Servidor' })); // Título da página de monitoramento
app.use(statusMonitor({ path: '/status' })); // Rota para acessar o monitoramento
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
    origin: '*', // ✅ origem exata do frontend
    credentials: true, // ✅ permite enviar cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

// Rotas separadas
const HomeRoute = require('./routes/homeRoute');
const UsuarioRoute = require('./routes/usuarioRoute');
const LoginRoute = require('./routes/loginRoute');
const WhatsappRoute = require('./routes/whatsappRoute');
const MonitorRoute = require('./routes/monitorRoute');


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

// Iniciando a rota de monitoramento
const monitorRouteInstance = new MonitorRoute(session.store);
const monitorRouter = monitorRouteInstance.getRouter();

// LOGIN

app.use('/', monitorRouter); // Corrigido para usar monitorRouter
app.use('/login', loginRouter); // Corrigido aqui para usar loginRouter em vez de LoginRouter
app.use('/', autenticacaoMiddleware, homeRouteInstance.getRouter());
app.use('/usuarios', autenticacaoMiddleware, usuarioRouter);
app.use('/whatsapp', autenticacaoMiddleware, whatsappRouter); // Corrigido para usar whatsappRouter

app.listen(process.env.port || 3000, () => {
    console.log("Servidor web iniciado na porta 3000");
});
