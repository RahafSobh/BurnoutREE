import { Router } from 'express';
import { getTree, predict, train } from '../controllers/treeController.js';

const router = Router();

router.post('/train', train);
router.post('/predict', predict);
router.get('/tree', getTree);

export default router;