import { Router } from "express";
import UserController from "./controller/UserController";
import SurveysController from "./controller/SurveysController";
import SendEmailController  from './controller/SendEmailController';
import AnswersController from './controller/AnswersController';
import NpsController from './controller/NpsController';

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendEmailController = new SendEmailController();
const answersController = new AnswersController();
const npsController = new NpsController();



router.post("/user", userController.create);

router.post("/surveys", surveysController.create);
router.post("/sendEmail", sendEmailController.execute );

router.get("/surveys", surveysController.show);
router.get("/answers/:value", answersController.execute);

router.get("/nps/:surver_id", npsController.execute)

export default router;
