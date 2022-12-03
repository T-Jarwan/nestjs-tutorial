// Packages
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Interfaces
import { Course } from 'src/interfaces/course';

@Injectable()
export class CoursesService {
    constructor(@InjectModel('Course') private courseModel: Model<Course>) { }

    async findAll(): Promise<Course[]> {
        return this.courseModel.find().exec();
    }

    async findOne(url: string): Promise<Course> {
        return this.courseModel.findOne({ url });
    }

    async create(course: Partial<Course>): Promise<Course> {
        return await this.courseModel.create(course);
    }

    async update(id: string, changes: Partial<Course>): Promise<Course> {
        return this.courseModel.findOneAndUpdate({ _id: id }, changes, { new: true });
    }

    async delete(id: string) {
        return await this.courseModel.findByIdAndRemove({ _id: id });
    }
}
