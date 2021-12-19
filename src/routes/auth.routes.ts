import { Router } from 'express';
import { signup, signin, profile } from '../controllers/auth.controller'
import { tokenValidation } from '../middlewares/validateToken'

const router: Router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', tokenValidation, profile);

export default router;