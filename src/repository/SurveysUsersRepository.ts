import { EntityRepository, Repository } from "typeorm";
import SurveysUser from "../models/SurveysUsers";

@EntityRepository(SurveysUser)
class SurveysUsersRepository extends Repository<SurveysUser>{

}

export default SurveysUsersRepository;