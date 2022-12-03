// Packages
import { Model } from 'mongoose';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';

// Interfaces
import { User } from 'src/interfaces/user';

// Config
import { JWT_SECRET } from 'src/config/keys';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async signUp(email: string, plainTextPassword: string, roles: string[]) {

        password(plainTextPassword).hash((error, hash) => {
            if (error) throw new UnauthorizedException('Something went wrong!');

            const newUser = {
                email,
                roles,
                passwordHash: hash
            };

            console.log("object", newUser);

            return this.userModel.create(newUser);
        });
    }

    async login(email: string, plainTextPassword: string) {
        const user = await this.userModel.findOne({ email });

        if (!user) throw new BadRequestException('Email or password is not correct');

        return new Promise((resolve, reject) => {
            password(plainTextPassword).verifyAgainst(
                user.passwordHash,
                (err, verified) => {
                    if (!verified) reject(new UnauthorizedException());

                    const authJWTToken = jwt.sign({ email, roles: user.roles },
                        JWT_SECRET);

                    resolve({authJWTToken});
                }
            )
        });
    }
}
