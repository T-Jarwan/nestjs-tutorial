// Packages
import { Injectable } from "@nestjs/common";

// Guards
import { AuthorizationGuard } from "src/guards/authorization.guard";

@Injectable()
export class AdminGuard extends AuthorizationGuard {
    constructor() {
        super(["ADMIN"]);
    }
}