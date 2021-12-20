import { Router } from 'express';
import { signup, signin, getProfile } from '../controllers/auth.controller'
import { tokenValidation } from '../middlewares/validateToken'

const router: Router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', tokenValidation, getProfile);

export default router;