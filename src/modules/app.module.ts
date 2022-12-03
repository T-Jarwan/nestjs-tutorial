// Packages
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { AppController } from 'src/controllers/app.controller';
import { CoursesController } from 'src/controllers/courses/courses.controller';
import { LessonsController } from 'src/controllers/lessons/lessons.controller';

// Services
import { AppService } from 'src/services/app.service';

// Modules
import { CoursesModule } from 'src/modules/courses/courses.module';
import { LessonsModule } from 'src/modules/lessons/lessons.module';
import { AuthModule } from 'src/modules/auth/auth.module';

// Config
import { MONGODB_CONNECTION_URL } from 'src/config/keys';

// Middlewares
import { GetUserMiddleware } from 'src/middlewares/get-user.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_CONNECTION_URL),
    CoursesModule,
    LessonsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUserMiddleware)
      .forRoutes(
        CoursesController,
        LessonsController
      )
  }
}
