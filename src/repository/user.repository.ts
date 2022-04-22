import { Injectable } from "@nestjs/common";
import { User } from "src/model/user.entity";
import {EntityRepository, Repository} from "typeorm";

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    findByName(firstName: string, lastName: string) {
        return this.findOne({ firstName, lastName });
    }

}