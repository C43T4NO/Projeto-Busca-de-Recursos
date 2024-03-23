const http = require('http');
const mysql = require('mysql');

// Configurações do banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'ideia2000'
});

// Conecta ao banco de dados
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

// Crie o servidor HTTP
const server = http.createServer((req, res) => {
    // Lógica do servidor aqui...

    // Permitindo CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

// Rotas para buscar empresas e recursos
server.on('request', (req, res) => {
    if (req.url === '/empresas') {
        connection.query('SELECT * FROM empresas', (err, results) => {
            if (err) {
                console.error('Erro ao buscar empresas:', err);
                res.writeHead(500);
                res.end();
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(results));
        });
    } else if (req.url === '/recursos') {
        connection.query('SELECT * FROM recursos', (err, results) => {
            if (err) {
                console.error('Erro ao buscar recursos:', err);
                res.writeHead(500);
                res.end();
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(results));
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

// Inicie o servidor na porta 3000
server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});