import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import Survey from './Surveys';
import User from './Users';

@Entity("surveys_users")
class SurveysUser {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User;

  @ManyToOne(() => Survey)
  @JoinColumn({name: "surveys_id"})
  surveys: Survey;
  survey_id: string;

  @Column()
  surveys_id: string;

  @Column()
  value: Number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default SurveysUser;