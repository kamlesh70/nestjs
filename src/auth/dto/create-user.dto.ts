import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, Validate } from "class-validator";
import { ROLE_ENUM } from "src/constants/app.enum";
import {UniqueUserRule} from "src/decorators/Rules/unique_user.rule";

export class CreateUserDto{
    @IsString()
    first_name: string;

    @IsOptional()
    @IsString()
    last_name: string;

    @IsEmail()
    @Validate(UniqueUserRule)
    @Transform(({value})=> value?.toString().toLowerCase())
    email: string;

    @IsString()
    @IsStrongPassword()
    password: string;

    @IsEnum(ROLE_ENUM)
    @IsString()
    role: ROLE_ENUM;
}