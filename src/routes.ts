import { Router } from "express";
import UserController from "./controller/UserController";
import SurveysController from "./controller/ServeysController";
import SendEmailController  from './controller/SendEmailController'

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendEmailController = new SendEmailController()
router.post("/user", userController.create);
router.post("/surveys", surveysController.create);
router.post("/sendEmail", sendEmailController.execute )
router.get("/surveys", surveysController.show);

export default router;
