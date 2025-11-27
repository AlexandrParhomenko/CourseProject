import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateDisciplineDto} from "./dto/create-discipline.dto";
import {UpdateDisciplineDto} from "./dto/update-discipline.dto";
import {DisciplineService} from "./discipline.service";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Discipline} from "./discipline.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Сокращенное наименование дисциплин')
@Controller('disciplines')
export class DisciplineController {
    constructor(private disciplinesService: DisciplineService) {}

    @ApiOperation({summary: 'Создание дисциплины'})
    @ApiResponse({status: 200, type: Discipline})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() disciplineDto: CreateDisciplineDto) {
        return this.disciplinesService.createDiscipline(disciplineDto);
    }

    @ApiOperation({summary: 'Создание дисциплины'})
    @ApiResponse({status: 200, type: Discipline})
    @UsePipes(ValidationPipe)
    @Get()
    getDisciplines() {
        return this.disciplinesService.getDisciplines();
    }

    @ApiOperation({summary: 'Обновить дисциплину'})
    @ApiResponse({status: 200, type: Discipline})
    @ApiResponse({status: 404, description: 'дисциплина не найдена'})
    @ApiParam({name: 'discipline_id', type: Number, description: 'ID дисциплины'})
    @ApiBody({type: UpdateDisciplineDto})
    @UsePipes(ValidationPipe)
    @Put(':discipline_id')
    update(@Param('discipline_id', ParseIntPipe) discipline_id: number, @Body() updateDto: UpdateDisciplineDto) {
        return this.disciplinesService.updateDiscipline(discipline_id, updateDto);
    }

    @ApiOperation({summary: 'Удалить дисциплину (мягкое удаление)'})
    @ApiResponse({status: 200, type: Discipline})
    @ApiResponse({status: 404, description: 'дисциплина не найдена'})
    @ApiParam({name: 'discipline_id', type: Number, description: 'ID дисциплины'})
    @Delete(':discipline_id')
    delete(@Param('discipline_id', ParseIntPipe) discipline_id: number) {
        return this.disciplinesService.deleteDiscipline(discipline_id);
    }
}


