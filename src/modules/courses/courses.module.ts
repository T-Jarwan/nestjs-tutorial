// Packages
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { CoursesController } from 'src/controllers/courses/courses.controller';

// Schemas
import { CoursesSchema } from 'src/schemas/courses.schema';

// Services
import { CoursesService } from 'src/services/courses/courses.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'Course',
            schema: CoursesSchema
        }])
    ],
    controllers: [CoursesController],
    providers: [CoursesService]
})
export class CoursesModule { }
