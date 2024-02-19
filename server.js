const express = require('express');
const ejsLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const http = require('http');
const ngrok = require('@ngrok/ngrok');

// Create webserver
//http.createServer((req, res) => {
 // res.writeHead(200, { 'Content-Type': 'text/html' });
///  res.end('Congrats you have created an ngrok web server');
//}).listen(8080, () => console.log('Node.js web server at 8080 is running...'));

// Get your endpoint online
//ngrok.connect({ addr: 8080, authtoken_from_env: true })
  //.then(listener => console.log(`Ingress established at: ${listener.url()}`));

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.set('layout', './layout');

app.use(express.static("public/"))
app.use(ejsLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Rotas separadas
const HomeRoute = require('./routes/homeRoute');
const UsuarioRoute = require('./routes/usuarioRoute');

const homeRouteInstance = new HomeRoute();
homeRouteInstance.initialize();

const usuarioRouteInstance = new UsuarioRoute();
const usuarioRouter = usuarioRouteInstance.getRouter();

app.use('/', homeRouteInstance.getRouter());
app.use('/usuarios', usuarioRouter);

app.listen(process.env.port || 80, () => {
    console.log("Servidor web iniciado na porta 80");
});
