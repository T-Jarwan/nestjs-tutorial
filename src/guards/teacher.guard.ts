// Packages
import { Injectable } from "@nestjs/common";

// Guards
import { AuthorizationGuard } from "src/guards/authorization.guard";

@Injectable()
export class TeacherGuard extends AuthorizationGuard {
    constructor() {
        super(["TEACHER"]);
    }
}