import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserService } from "src/user/service/user.service";

@ValidatorConstraint({ name: 'UniqueUser', async: true })
@Injectable()
export class UniqueUserRule implements ValidatorConstraintInterface{
    constructor(protected readonly userService: UserService){
        console.log("injected =======", userService);
    }

    async validate(value: string, validationArgs: ValidationArguments): Promise<boolean>{
        try {
            if(value === ''){
                value = undefined;
                return true;
            }
            const user = await this.userService.findOneByEmail(value);
            return !user;
        } catch (error) {
            console.log("error", error);
            return true;
        }
    }
    defaultMessage?(args?: ValidationArguments): string {
        return `User already exist with email ${args?.value} !`;
    }
}