import { Router} from 'express'
import UserController from './controller/UserController';

const router = Router();

const userController = new UserController();
router.post('/user', userController.create)

export default router