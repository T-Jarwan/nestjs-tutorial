import { IsBoolean, IsInt, IsMongoId, IsString } from 'class-validator';

export class Course {
    @IsString()
    @IsMongoId()
    _id: string;

    @IsInt({ message: 'seqNo must be numeric' })
    seqNo: number;

    @IsString({ always: false })
    url: string;

    @IsString()
    iconUrl: string;

    @IsString()
    courseListIcon: string;

    @IsString()
    description: string;

    @IsString()
    longDescription?: string;

    @IsString()
    category: string;

    @IsInt()
    lessonsCount: number;

    @IsBoolean()
    promo: boolean;
}