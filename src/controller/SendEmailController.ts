import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { resolve } from "path";
import UserRepository from "../repository/UsersRepository";
import SurveyRepository from "../repository/SurveysRepository";
import SurveysUsersRepository from "../repository/SurveysUsersRepository";
import SendEmailService from "../services/SendEmailServices";

class SendEmailController {
  async execute(request: Request, response: Response) {
    const { email, surveys_id } = request.body;

    const usersRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return response.status(400).json({ message: "User does not exists" });
    }

    const survey = await surveyRepository.findOne({
      id: surveys_id,
    });

    if (!surveyRepository) {
      return response.status(400).json({ message: " User does not exists" });
    }

    const npsPath = resolve(__dirname, "..", "view", "email", "npsEmail.hbs");
    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL,
    };

    const surveysUserExists = await surveyUserRepository.findOne({
      where: [{ user_id: user.id }, { value: null }],
      relations:["user", "surveys"]
    });

    if (surveysUserExists) {
        
      await SendEmailService.execute(
        email,
        survey.title,
        variables,
        npsPath,
    
      );
      return response.json(surveysUserExists);
    }

    const surveyUser = surveyUserRepository.create({
      user_id: user.id,
      surveys_id,
    });

    await surveyUserRepository.save(surveyUser);

    await SendEmailService.execute(
        email,
        survey.title,
        variables,
        npsPath,
    
      );

    return response.status(200).json(surveyUser);
  }
}

export default SendEmailController;
