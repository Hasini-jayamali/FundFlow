import db from '../config/db.js';

const createTableSQL = `
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  nic VARCHAR(20) UNIQUE,
  email VARCHAR(255) UNIQUE,
  monthlyIncome INT,
  creditScore INT,
  password VARCHAR(255),
  role ENUM('customer', 'admin') DEFAULT 'customer'
);`;

db.query(createTableSQL, (err, result) => {
  if (err) throw err;
  console.log('Customers table created or already exists.');
  db.end();
});
