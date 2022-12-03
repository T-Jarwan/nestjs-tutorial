import { IsInt, IsMongoId, IsString } from 'class-validator';

export class Lesson {
    @IsString()
    @IsMongoId()
    _id: string;

    @IsString()
    description: string;

    @IsString()
    duration: string;

    @IsInt({ message: 'seqNo must be numeric' })
    seqNo: number;

    @IsInt()
    courseId: number;
}
