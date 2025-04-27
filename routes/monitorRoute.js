const express = require('express');
const axios = require('axios');

class MonitorRoute {
    constructor(sessionStore) {
        this.router = express.Router();
        this.sessionStore = sessionStore;
        this.initializeRoutes();
    }

    initializeRoutes() {
        const BASE_URL = 'http://137.131.128.248:3000'; // << IP da sua VM
        const rotas = [
            { nome: 'Home', url: `${BASE_URL}/` },
            { nome: 'Login', url: `${BASE_URL}/login` },
            { nome: 'Usuários', url: `${BASE_URL}/usuarios` },
            { nome: 'Whatsapp', url: `${BASE_URL}/whatsapp` },
            // Adicionando novas rotas para monitoramento
            { nome: 'Usuarios - Cadastrar', url: `${BASE_URL}/usuarios/cadastrar` },
            { nome: 'Usuarios - Viagem', url: `${BASE_URL}/usuarios/viagem` },
            { nome: 'Usuarios - Implantacoes', url: `${BASE_URL}/usuarios/implantacoes` },
            { nome: 'Usuarios - Relatórios', url: `${BASE_URL}/usuarios/relatorios` },
            { nome: 'Usuarios - Calendário', url: `${BASE_URL}/usuarios/calendario` },
            { nome: 'Whatsapp - QR Code', url: `${BASE_URL}/whatsapp/qrcode` },
            { nome: 'Whatsapp - Enviar Mensagem', url: `${BASE_URL}/whatsapp/enviar` },
            { nome: 'Whatsapp - QR Code Img', url: `${BASE_URL}/whatsapp/qrcode-img` }
        ];

        this.router.get('/monitor', async (req, res) => {
            const resultados = await Promise.all(rotas.map(async (rota) => {
                const inicio = Date.now();
                try {
                    const resposta = await axios.get(rota.url, { timeout: 5000 });
                    const tempoResposta = Date.now() - inicio;
                    let status = '🟢 OK';
                    if (resposta.status >= 400 && resposta.status < 500) {
                        status = '🟠 Atenção';
                    }
                    return { 
                        nome: rota.nome, 
                        url: rota.url, 
                        status, 
                        codigo: resposta.status, 
                        tempo: tempoResposta 
                    };
                } catch (err) {
                    const tempoResposta = Date.now() - inicio;
                    return { 
                        nome: rota.nome, 
                        url: rota.url, 
                        status: '🔴 Erro', 
                        codigo: err.response ? err.response.status : 'Sem resposta', 
                        tempo: tempoResposta 
                    };
                }
            }));

            // Pegar quantidade de usuários logados
            let usuariosLogados = 0;
            if (this.sessionStore && this.sessionStore.length) {
                usuariosLogados = this.sessionStore.length;
            } else if (this.sessionStore && typeof this.sessionStore.all === 'function') {
                const sessions = await new Promise((resolve, reject) => {
                    this.sessionStore.all((err, sessions) => {
                        if (err) reject(err);
                        else resolve(sessions);
                    });
                });
                usuariosLogados = Object.keys(sessions).length;
            }

            let html = ` 
                <html>
                <head>
                    <title>Status das Rotas</title>
                    <meta http-equiv="refresh" content="10">
                    <style>
                        body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
                        table { width: 100%; background: #fff; border-collapse: collapse; }
                        th, td { padding: 10px; text-align: center; border-bottom: 1px solid #ddd; }
                        th { background: #333; color: #fff; }
                        tr:hover { background-color: #f1f1f1; }
                        .ok { background-color: #d4edda; }
                        .atencao { background-color: #fff3cd; }
                        .erro { background-color: #f8d7da; }
                    </style>
                </head>
                <body>
                    <h1>Status das Rotas do Sistema</h1>
                    <p><strong>Usuários Logados:</strong> ${usuariosLogados}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>URL</th>
                                <th>Status</th>
                                <th>Código HTTP</th>
                                <th>Tempo de Resposta (ms)</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            resultados.forEach(r => {
                let classe = '';
                if (r.status.includes('OK')) classe = 'ok';
                else if (r.status.includes('Atenção')) classe = 'atencao';
                else classe = 'erro';

                html += `
                    <tr class="${classe}">
                        <td>${r.nome}</td>
                        <td><a href="${r.url}" target="_blank">${r.url}</a></td>
                        <td>${r.status}</td>
                        <td>${r.codigo}</td>
                        <td>${r.tempo}ms</td>
                    </tr>
                `;
            });

            html += `
                        </tbody>
                    </table>
                </body>
                </html>
            `;

            res.send(html);
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = MonitorRoute;
