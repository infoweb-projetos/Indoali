const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const cors = require('cors');

//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./database.sqlite', (error) => {
    if (error) {
        console.log(error);
        return;
    }
    db.run('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, Nome TEXT, Username TEXT, Email TEXT, Senha TEXT)', (error) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log('Tabela criada com sucesso!');
    });
});

app.post('/register', (req, res) => {
    const sentEmail = req.body.Email;
    const sentName = req.body.Name;
    const sentUserName = req.body.UserName;
    const sentSenha = req.body.Senha;

    console.log('Dados recebidos:', req.body); 

    const SQL = 'INSERT INTO usuarios (Nome, Username, Email, Senha) VALUES (?, ?, ?, ?)';
    const Values = [sentName, sentUserName, sentEmail, sentSenha];

    db.run(SQL, Values, (err) => {
        if (err) {
            console.error('Ocorreu um erro no cadastro:', err); 
            res.status(500).send(err); 
        } else {
            console.log('O usuário foi adicionado');
            res.send({ message: 'Usuário cadastrado com sucesso!' });
        }
    });
});

app.post('/login', (req, res) => {
    const { Email, Senha } = req.body;

    const SQL = 'SELECT * FROM usuarios WHERE Email = ? AND Senha = ?';
    const Values = [Email, Senha];

    db.all(SQL, Values, (error, rows) => {
        if (error) {
            console.error('Erro ao consultar usuários:', error.message);
            res.status(500).send(error.message);
        } else if (rows.length > 0) {
            res.send(rows[0]);
        } else {    
            res.status(401).send({ message: 'Credenciais inválidas' });
        }
    });
});

//const authenticateToken = (req, res, next) => {
//    const token = req.headers['authorization'];
//    if (!token) return res.sendStatus(401);
//
//    jwt.verify(token, 'secreto', (err, user) => {
//        if (err) return res.sendStatus(403);
//        req.user = user;
//        next();
//    });
//};

//app.get('/dashboard', authenticateToken, (req, res) => {
//    res.json({ message: 'Bem-vindo ao Dashboard' });
//});

//app.post('/login', (req, res) => {
//    const { Email, Senha } = req.body;
//
//    const user = db.find(user => user.email === Email);
//    if (user && bcrypt.compareSync(Senha, user.senha)) {
//        const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });
//        return res.json({ token });
//    }
//
//    res.status(401).json({ message: 'Credenciais inválidas' });
//});

app.listen(3002, () => {
    console.log('Server is running on port 3002');
});
