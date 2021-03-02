import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import SurveysUsersRepository from "../repository/SurveysUsersRepository";

class NpsController {
  async execute(request: Request, response: Response) {
    const { surveys_id } = request.params;

    const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveyUserRepository.find({
      surveys_id,
      value: Not(IsNull()),
    });

    const detractors = surveyUser.filter((survey) => {
      return survey.value >= 0 && survey.value <= 6;
    }).length;

    const passive = surveyUser.filter((survey) => {
      return survey.value >= 7 && survey.value <= 8;
    }).length;

    console.log(passive);

    const promoters = surveyUser.filter((survey) => {
      return survey.value >= 9 && survey.value <= 10;
    }).length;

    const total = surveyUser.length;

    const calculate = ((promoters - detractors) / total) * 100;

    const serviceStatus =
      calculate <= 50 ? "Bad" : calculate <= 70 ? "Regular" : "Good";

    return response.json({
      detractors,
      promoters,
      passive,
      total,
      nps: calculate,
      serviceStatus,
    });
  }
}

export default NpsController;
