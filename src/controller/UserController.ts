import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../repository/UsersRepository";
import * as yup from 'yup';
import AppError from "../errors/appError";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório!"),
      email: yup.string().email().required("Email é obrigatório")
    })

          try {
            await schema.validate(request.body)
          } catch (err) {
              throw new AppError(err)
          }
    
  
    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      
    throw new AppError(" User already exists!");;
    }
    
    const user =  usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return response.status(200).json(user);
  }
}

export default UserController;
