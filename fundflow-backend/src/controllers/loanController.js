import { db } from '../config/db.js';

// Calculate Loan Score
function calculateLoanScore({ loanAmount, durationMonths, monthlyIncome, creditScore }) {
  let score = 100;
  const emi = loanAmount / durationMonths;

  if (emi > 0.4 * monthlyIncome) score -= 30;
  if (loanAmount > 0.8 * monthlyIncome * durationMonths) score -= 20;
  if (creditScore > 700) score += 10;

  return Math.max(0, Math.min(100, score));
}

// Create Loan Application
export const createLoanApplication = async (req, res) => {
  const { loanAmount, durationMonths, purpose, monthlyIncome } = req.body;
  const userId = req.user.id;

  try {
    const creditScore = 700;

    const score = calculateLoanScore({
      loanAmount: Number(loanAmount),
      durationMonths: Number(durationMonths),
      monthlyIncome: Number(monthlyIncome),
      creditScore
    });

    const status = score >= 70 ? 'Approved' : 'Rejected';

    const [result] = await db.query(
      'INSERT INTO loan_applications (userId, loanAmount, durationMonths, purpose, monthlyIncome, score, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, loanAmount, durationMonths, purpose, monthlyIncome, score, status]
    );

    res.status(201).json({
      message: 'Loan application submitted successfully',
      loanAmount,
      durationMonths,
      monthlyIncome,
      creditScore,
      score,
      status
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Logged-in Customer's Loan Applications
export const getMyLoans = async (req, res) => {
  const userId = req.user.id;
  try {
    const [results] = await db.query(
      'SELECT * FROM loan_applications WHERE userId = ?',
      [userId]
    );
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Loan Applications (Admin only)
export const getAllLoans = async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT la.*, c.name AS customerName, c.email AS customerEmail
       FROM loan_applications la
       JOIN customers c ON la.userId = c.id`
    );
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};