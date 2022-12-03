// Packages
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

// Config
import { JWT_SECRET } from 'src/config/keys';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: any) => void) {
        const authJWTToken = req.headers.authorization;

        if (!authJWTToken) {
            next();
            return
        }

        try {
            const user = jwt.verify(authJWTToken, JWT_SECRET);

            console.log("Found user details in JWT: ", user);
            req["user"] = user;

        } catch (err) {
            console.log("Error handling authentication JWT: ", err);
        }
        next();
    }

}