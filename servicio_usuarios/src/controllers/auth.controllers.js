const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config');
require('dotenv').config();

const register = async (req, res) => {
  const { nombre, telefono, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  let sql = 'INSERT INTO USUARIOS SET ?';
  let newCliente = { nombre, telefono, email, password: hashedPassword };
  db.query(sql, newCliente, (err, result) => {
    if (err) throw err;
    res.status(201).json(result);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  let sql = 'SELECT * FROM USUARIOS WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const cliente = results[0];
    const validPassword = await bcrypt.compare(password, cliente.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: cliente.id, email: cliente.email }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });

    res.json({ token });
  });
};


module.exports = { register, login };