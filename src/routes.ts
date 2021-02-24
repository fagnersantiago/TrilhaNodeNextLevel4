import { Router} from 'express'
import UserController from './controller/UserController';
import SurveysController from './controller/ServeysController'; 

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();

router.post('/user', userController.create);
router.post('/surveys', surveysController.create);
router.get('/surveys', surveysController.show)

export default router