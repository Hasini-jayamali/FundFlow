import { Router } from 'express';
const router = Router();
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { getAllCustomers, createCustomer, editCustomer, deleteCustomer } from '../controllers/customerController.js';

router.use(authenticateToken, authorizeRoles('admin'));
router.get('/', getAllCustomers);
router.post('/', createCustomer);
router.put('/:id', editCustomer);
router.delete('/:id', deleteCustomer);

export default router;