import { Router } from 'express';
import contactsRoutes from './routes/contacts';
import usersRoutes from './routes/users';

const router = Router();
router.use('/contacts', contactsRoutes);
router.use('/users', usersRoutes);

export default router;