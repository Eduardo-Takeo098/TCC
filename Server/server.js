const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Configuração do MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'carona_solidaria'
});

// Conexão com o MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  }
});

// Rota para realizar o login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Validação das entradas
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  // Consulta parametrizada
  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao executar a consulta' });
    }

    if (results.length > 0) {
      const user = results[0];

      // Verificação da senha usando bcrypt
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Erro ao comparar as senhas:', err);
          return res.status(500).json({ error: 'Erro ao comparar as senhas' });
        }

        if (isMatch) {
          // Senha correta, gera o token de autenticação usando JWT
          const token = jwt.sign({ userId: user.id }, 'seu_secreto');

          res.json({ token, user });
        } else {
          // Senha incorreta
          res.status(401).json({ error: 'Credenciais inválidas' });
        }
      });
    } else {
      // Usuário não encontrado
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
});

// Rota para cadastrar um usuário
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Validação das entradas
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
  }

  // Verificação se o usuário já existe
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  connection.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro ao executar a consulta' });
    }

    if (results.length > 0) {
      // Usuário já existe
      return res.status(409).json({ error: 'Email já está em uso' });
    }

    // Hash da senha usando bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Erro ao gerar o hash da senha:', err);
        return res.status(500).json({ error: 'Erro ao gerar o hash da senha' });
      }

      // Inserção parametrizada
      const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      connection.query(insertQuery, [name, email, hashedPassword], (err, results) => {
        if (err) {
          console.error('Erro ao executar a inserção:', err);
          return res.status(500).json({ error: 'Erro ao executar a inserção' });
        }

        // Cadastro bem-sucedido
        const token = jwt.sign({ userId: results.insertId }, 'seu_secreto');
        res.json({ token, user: { name, email } });
      });
    });
  });
});

// Inicie o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000.');
});
