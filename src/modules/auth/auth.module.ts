// Packages
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { AuthController } from 'src/controllers/auth/auth.controller';

// Schemas
import { UsersSchema } from 'src/schemas/user.schema';

// Services
import { AuthService } from 'src/services/auth/auth.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'User',
            schema: UsersSchema
        }])
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
