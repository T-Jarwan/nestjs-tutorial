import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LessonsController } from 'src/controllers/lessons/lessons.controller';
import { LessonsSchema } from 'src/schemas/lessons.schema';
import { LessonsService } from 'src/services/lessons/lessons.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'Lesson',
            schema: LessonsSchema
        }])
    ],
    providers: [LessonsService],
    controllers: [LessonsController],
})
export class LessonsModule { }
