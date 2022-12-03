// Packages
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';

// Guards
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AdminGuard } from 'src/guards/admin.guard';

// Interfaces
import { Course } from 'src/interfaces/course';

// Services
import { CoursesService } from 'src/services/courses/courses.service';

@Controller('courses')
@UseGuards(AuthenticationGuard)
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Get()
    async findAll(): Promise<Course[]> {
        return this.coursesService.findAll();
    }

    @Get(':url')
    async findOne(@Param('url') url: string): Promise<Course> {
        const course = await this.coursesService.findOne(url);

        if (!course) {
            throw new NotFoundException(`Could not find course for url: ${url}`)
        }
        return course;
    }

    @Post()
    @UseGuards(AdminGuard)
    async create(@Body() course: Course): Promise<Course> {
        return this.coursesService.create(course);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    async update(@Param('id') id: string, @Body() changes: Course): Promise<Course> {
        if (changes._id) throw new BadRequestException("Can't update course id");
        return this.coursesService.update(id, changes);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    async delete(@Param('id') id: string) {
        return this.coursesService.delete(id);
    }
}
