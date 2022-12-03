// Packages
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

// Services
import { AuthService } from 'src/services/auth/auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(
        @Body('email') email: string,
        @Body('password') plainTextPassword: string
    ) {
        if (!email && !plainTextPassword) throw new BadRequestException('Email or password is empty');

        return this.authService.login(email, plainTextPassword);
    }

    @Post('signup')
    async signUp(
        @Body('email') email: string,
        @Body('password') plainTextPassword: string,
        @Body('roles') roles: string[]
    ) {
        if (!email && !plainTextPassword && !roles) throw new BadRequestException('Email or password is empty');

        return await this.authService.signUp(email, plainTextPassword, roles);
    }
}
