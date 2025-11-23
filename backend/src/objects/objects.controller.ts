import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateObjectDto} from "./dto/create-object.dto";
import {UpdateObjectDto} from "./dto/update-object.dto";
import {ObjectsService} from "./objects.service";
import {ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody} from "@nestjs/swagger";
import {ObjectTable} from "./object.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Объекты')
@Controller('objects')
export class ObjectsController {
    constructor(private objectsService: ObjectsService) {}

    @ApiOperation({summary: 'Создание объекта'})
    @ApiResponse({status: 200, type: ObjectTable})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() objectDto: CreateObjectDto) {
        return this.objectsService.createObject(objectDto);
    }

    @ApiOperation({summary: 'Получить объект по ID'})
    @ApiResponse({status: 200, type: ObjectTable})
    @ApiResponse({status: 404, description: 'Объект не найден'})
    @ApiParam({name: 'object_id', type: Number, description: 'ID объекта'})
    @Get('/:object_id')
    getById(@Param('object_id', ParseIntPipe) object_id: number) {
        return this.objectsService.getObjectById(object_id);
    }

    @ApiOperation({summary: 'Получить объекты по ID договора'})
    @ApiResponse({status: 200, type: [ObjectTable]})
    @ApiParam({name: 'contract_id', type: Number, description: 'ID договора'})
    @Get('contracts/:contract_id')
    getByContractId(@Param('contract_id', ParseIntPipe) contractId: number) {
        return this.objectsService.getObjectsByContractId(contractId);
    }

    @ApiOperation({summary: 'Обновить объект'})
    @ApiResponse({status: 200, type: ObjectTable})
    @ApiResponse({status: 404, description: 'Объект не найден'})
    @ApiParam({name: 'id', type: Number, description: 'ID объекта'})
    @ApiBody({type: UpdateObjectDto})
    @UsePipes(ValidationPipe)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateObjectDto) {
        return this.objectsService.updateObject(id, updateDto);
    }

    @ApiOperation({summary: 'Удалить объект'})
    @ApiResponse({status: 200, description: 'Объект успешно удален'})
    @ApiResponse({status: 404, description: 'Объект не найден'})
    @ApiParam({name: 'id', type: Number, description: 'ID объекта'})
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.objectsService.deleteObject(id);
    }
}

