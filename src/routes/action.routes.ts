import { Router } from 'express';
import { actionController } from '../controllers/action.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { actionSchema } from '../schemas/action.schema';

const router = Router();

router.post('/action', validateRequest(actionSchema), actionController.logAction);

export default router;