import express from 'express';
import { 
    createSubtask,
    deleteSubtask,
    editSubtaskTitle,
    setSubtaskDone
} from '../controllers/subtaskController.js';
import { Auth } from '../middleware/Auth.js';

const router = express.Router();

router.use(Auth);

router.put('/', createSubtask);

router.delete('/', deleteSubtask);

router.put('/title', editSubtaskTitle);

router.put('/done', setSubtaskDone);

export { router as subtaskRoutes };