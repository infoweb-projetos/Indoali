const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const cors = require('cors');

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

app.post('/Login', (req, res) => {
    const sentLoginUserName = req.body.LoginUserName;
    const sentLoginSenha = req.body.LoginSenha;

    const SQL = 'SELECT * FROM usuarios WHERE Username = ? AND Senha = ?'; 
    const Values = [sentLoginUserName, sentLoginSenha];

    db.all(SQL, Values, (error, rows) => {
        if (error) {
            res.send({ error: error })
        } else if (rows.length > 0) {
            res.send(rows[0])
        } else {
            res.send({ message: 'Erro nas credenciais' }) 
        }
    });
});

app.listen(3002, () => {
    console.log('Server is running on port 3002');
});
