import { db } from '../config/db.js';
import { hash as _hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken'; 

export const register = async (req, res) => {
  const { name, nic, email, monthlyIncome, password, role } = req.body;
  try {
    const hash = await _hash(password, 10);
    const creditScore = Math.floor(Math.random() * (850 - 300 + 1)) + 300;

    db.query(
      'INSERT INTO customers (name, nic, email, monthlyIncome, creditScore, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, nic, email, monthlyIncome, creditScore, hash, role || 'customer'],
      (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ message: 'User registered' });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM customers WHERE email = ?', [email], async (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const user = rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, role: user.role });
  });
};