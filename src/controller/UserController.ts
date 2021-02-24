import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../repository/UsersRepository";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    console.log(name)
    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      return response.status(400).json({ message: "User already existis" });
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
