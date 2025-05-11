import db from '../config/db.js';

const createTableSQL = `
CREATE TABLE loan_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  loanAmount INT,
  durationMonths INT,
  purpose VARCHAR(255),
  monthlyIncome INT,
  existingLoans INT,
  score INT,
  status VARCHAR(50),
  recommendation VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES customers(id)
);`;

db.query(createTableSQL, (err, result) => {
  if (err) throw err;
  console.log('Loan table created or already exists.');
  db.end();
});
