import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes} from '@nestjs/common';
import {TypeWorksService} from "./type-works.service";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TypeWorks} from "./type-works.model";
import {ValidationPipe} from "../pipes/validation.pipe";
import {CreateTypeWorksDto} from "./dto/create-type-works.dto";
import {UpdateTypeWorksDto} from "./dto/update-type-works.dto";

@ApiTags('Типы работ')
@Controller('type_works')
export class TypeWorksController {
    constructor(private typeWorksService: TypeWorksService) {}

    @ApiOperation({summary: 'Создание типа работ'})
    @ApiResponse({status: 200, type: TypeWorks})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() objectDto: CreateTypeWorksDto) {
        return this.typeWorksService.createTypeWork(objectDto);
    }

    @ApiOperation({summary: 'Получить типы'})
    @ApiResponse({status: 200, type: TypeWorks})
    @ApiResponse({status: 404, description: 'Тип не найден'})
    @Get('/')
    getTypeDocs() {
        return this.typeWorksService.getTypeWork();
    }

    @ApiOperation({summary: 'Обновить тип'})
    @ApiResponse({status: 200, type: TypeWorks})
    @ApiResponse({status: 404, description: 'Тип не найден'})
    @ApiParam({name: 'type_work_id', type: Number, description: 'ID типа'})
    @ApiBody({type: UpdateTypeWorksDto})
    @UsePipes(ValidationPipe)
    @Put(':type_work_id')
    update(@Param('type_work_id', ParseIntPipe) type_doc_id: number, @Body() updateDto: UpdateTypeWorksDto) {
        return this.typeWorksService.updateTypeDoc(type_doc_id, updateDto);
    }

    @ApiOperation({summary: 'Удалить тип'})
    @ApiResponse({status: 200, description: 'Тип успешно удален'})
    @ApiResponse({status: 404, description: 'Тип не найден'})
    @ApiParam({name: 'type_work_id', type: Number, description: 'ID типа'})
    @Delete(':type_work_id')
    delete(@Param('type_work_id', ParseIntPipe) type_doc_id: number) {
        return this.typeWorksService.deleteTypeDoc(type_doc_id);
    }
}

