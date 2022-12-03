// Packages
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Interfaces
import { Lesson } from 'src/interfaces/lesson';

@Injectable()
export class LessonsService {

    constructor(@InjectModel('Lesson') private lessonsModel: Model<Lesson>) { }

    search(courseId: string, sortOrder: string, pageNumber: number, pageSize: number) {
        return this.lessonsModel.find(
            { course: courseId },
            null,
            {
                skip: pageNumber * pageSize,
                limit: pageSize,
                sort: {
                    seqNo: sortOrder
                }
            }
        );
    }

    async create(lesson: Lesson): Promise<Lesson> {
        return this.lessonsModel.create(lesson);
    }

}
