const mysql = require('mysql2');

class Database {
    #pool;

    get pool() {
        return this.#pool;
    }

    constructor() {
        this.#pool = mysql.createPool({
            host: process.env.DB_HOST || 'monorail.proxy.rlwy.net',
            database: process.env.DB_NAME || 'railway',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '4Fah56C5A4-hG1H2fg33bBEfeAAegGB1',
            port: process.env.DB_PORT || 45037,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        // Adicionando um evento de erro para lidar com erros de conexão
        this.#pool.on('error', (err) => {
            console.error('Erro na conexão com o banco de dados:', err.message);
            // Você pode querer adotar um comportamento mais robusto aqui, dependendo do caso.
        });
    }

    async ExecutaComando(sql, valores) {
        const pool = this.#pool.promise();
        try {
            const [rows, fields] = await pool.query(sql, valores);
            return rows;
        } catch (error) {
            console.error('Erro na execução do comando:', error);
            throw error;
        }
    }

    async executaComandoNonQuery(sql, valores) {
        const pool = this.#pool.promise();
        try {
            const [results] = await pool.query(sql, valores);
            return results.affectedRows > 0;
        } catch (error) {
            console.error('Erro na execução do comando:', error);
            throw error;
        }
    }

    async executaComandoLastInserted(sql, valores) {
        const pool = this.#pool.promise();
        try {
            const [results] = await pool.query(sql, valores);
            return results.insertId;
        } catch (error) {
            console.error('Erro na execução do comando:', error);
            throw error;
        }
    }
}

module.exports = Database;
