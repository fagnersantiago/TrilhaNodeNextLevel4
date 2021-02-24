import { FindRelationsNotFoundError, getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import SurveysRepository from "../repository/SurveysRepository";

class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const surveys = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(surveys);

    return response.status(200).json(surveys);
  }

  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const showAllSurveys = await surveysRepository.find();

    return response.json(showAllSurveys);
  }
}

export default SurveysController;
