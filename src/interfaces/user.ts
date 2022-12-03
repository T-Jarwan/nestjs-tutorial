// Packages
import { IsArray, IsEmail, IsMongoId, IsString } from 'class-validator';

export class User {
    @IsString()
    @IsMongoId()
    _id: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsArray()
    roles: string[];

    @IsString()
    passwordHash: string;
}
