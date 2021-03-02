import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import SurveysUsersRepository from "../repository/SurveysUsersRepository";

class AnswersController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveyRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveyRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("Survey User does not exists!");
    }

    surveyUser.value = Number(value);

    await surveyRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export default AnswersController;
