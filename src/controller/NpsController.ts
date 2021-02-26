import { Request, Response } from "express";
import { decorators } from "handlebars";
import { getCustomRepository, Not, IsNull } from "typeorm";
import SurveysUsersRepository from "../repository/SurveysUsersRepository";

class NpsController {
  async execute(request: Request, response: Response) {
    const { surveys_id } = request.params;

    const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveyUserRepository.find({
      surveys_id,
      value: Not(IsNull())

    });

    const detractors = surveyUser.filter((survey) => {
      survey.value >= 0 && survey.value <= 6;
    }).length;

    const promoters = surveyUser.filter((survey) => {
      survey.value >= 7 && survey.value <= 8;
    }).length;

    const passive = surveyUser.filter((survey) => {
      survey.value >= 9 && survey.value <= 10;
    }).length;

    const total = surveyUser.length;

    const calculate = (( detractors - promoters) / total) * 100;

    return response.json({
      decorators,
      promoters,
      passive,
      total,
      nps: calculate,
    });
  }
}

export default NpsController;
