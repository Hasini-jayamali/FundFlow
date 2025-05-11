import execute from '../config/db.js';

const getAllCustomers = async (req, res) => {
  try {
    const [rows] = await execute('SELECT * FROM customers');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createCustomer = async (req, res) => {
  const { name, nic, email, monthlyIncome } = req.body;
  const creditScore = Math.floor(Math.random() * (850 - 300 + 1)) + 300;
  try {
    await execute(
      'INSERT INTO customers (name, nic, email, monthlyIncome, creditScore) VALUES (?, ?, ?, ?, ?)',
      [name, nic, email, monthlyIncome, creditScore]
    );
    res.status(201).json({ message: 'Customer created' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const editCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, nic, email, monthlyIncome, creditScore } = req.body;
  try {
    await execute(
      'UPDATE customers SET name=?, nic=?, email=?, monthlyIncome=?, creditScore=? WHERE id=?',
      [name, nic, email, monthlyIncome, creditScore, id]
    );
    res.json({ message: 'Customer updated' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await execute('DELETE FROM customers WHERE id=?', [id]);
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { getAllCustomers, createCustomer, editCustomer, deleteCustomer };
