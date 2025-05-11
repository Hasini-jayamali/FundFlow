import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import {
  createLoanApplication,
  getMyLoans,
  getAllLoans
} from '../controllers/loanController.js';

const router = Router();

router.post('/', authenticateToken, authorizeRoles('customer'), createLoanApplication);
router.get('/mine', authenticateToken, authorizeRoles('customer'), getMyLoans);
router.get('/all', authenticateToken, authorizeRoles('admin'), getAllLoans);

export default router;
