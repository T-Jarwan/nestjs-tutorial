// Packages
import { BadRequestException, Body, Controller, Get, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';

// Interfaces
import { Lesson } from 'src/interfaces/lesson';

// Guards
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { TeacherGuard } from 'src/guards/teacher.guard';

// Services
import { LessonsService } from 'src/services/lessons/lessons.service';

@Controller('lessons')
@UseGuards(AuthenticationGuard)
export class LessonsController {
    constructor(private readonly lessonsService: LessonsService) { }

    @Get()
    searchLessons(
        @Query('courseId') courseId: string,
        @Query('sortOrder') sortOrder = 'asc',
        @Query('pageNumber', ParseIntPipe) pageNumber = 0,
        @Query('pageSize', ParseIntPipe) pageSize = 3
    ) {
        if (!courseId) throw new BadRequestException('courseId must be defined');
        if (sortOrder !== 'asc' && sortOrder !== 'desc') throw new BadRequestException('sortOrder must asc or desc');

        return this.lessonsService.search(courseId, sortOrder, pageNumber, pageSize);
    }

    @Post()
    @UseGuards(TeacherGuard)
    async create(@Body() lesson: Lesson): Promise<Lesson> {
        return this.lessonsService.create(lesson);
    }
}
