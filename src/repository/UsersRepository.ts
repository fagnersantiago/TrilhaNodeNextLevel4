import { EntityRepository, Repository } from "typeorm";
import User from '../models/Users'

@EntityRepository(User)
class UsersReposioty extends Repository<User> {


}

export default UsersReposioty