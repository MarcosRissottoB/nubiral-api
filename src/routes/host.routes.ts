import { Router } from 'express';
import { getHost } from '../controllers/host.controller'
import { tokenValidation } from '../middlewares/validateToken'

const router: Router = Router();

router.get('/host', tokenValidation, getHost);

export default router;