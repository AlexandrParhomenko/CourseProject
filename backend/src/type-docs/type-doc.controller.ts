import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateTypeDocDto} from "./dto/create-type-doc.dto";
import {UpdateTypeDocDto} from "./dto/update-type-doc.dto";
import {TypeDocService} from "./type-doc.service";
import {ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody} from "@nestjs/swagger";
import {ValidationPipe} from "../pipes/validation.pipe";
import {TypeDocs} from "./type-doc.model";

@ApiTags('Типы документов')
@Controller('type_docs')
export class TypeDocController {
    constructor(private typeDocService: TypeDocService) {}

    @ApiOperation({summary: 'Создание типа документов'})
    @ApiResponse({status: 200, type: TypeDocs})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() objectDto: CreateTypeDocDto) {
        return this.typeDocService.createTypeDoc(objectDto);
    }

    @ApiOperation({summary: 'Получить типы'})
    @ApiResponse({status: 200, type: TypeDocs})
    @ApiResponse({status: 404, description: 'Тип не найден'})
    @Get('/')
    getTypeDocs() {
        return this.typeDocService.getTypeDocs();
    }

    @ApiOperation({summary: 'Получить тип по ID'})
    @ApiResponse({status: 200, type: TypeDocs})
    @ApiResponse({status: 404, description: 'Тип не найден'})
    @ApiParam({name: 'type_doc_id', type: Number, description: 'ID типа'})
    @Get('/:type_doc_id')
    getById(@Param('type_doc_id', ParseIntPipe) type_doc_id: number) {
        return this.typeDocService.getTypeDocById(type_doc_id);
    }

    @ApiOperation({summary: 'Обновить тип'})
    @ApiResponse({status: 200, type: TypeDocs})
    @ApiResponse({status: 404, description: 'Тип не найден'})
    @ApiParam({name: 'type_doc_id', type: Number, description: 'ID типа'})
    @ApiBody({type: UpdateTypeDocDto})
    @UsePipes(ValidationPipe)
    @Put(':type_doc_id')
    update(@Param('type_doc_id', ParseIntPipe) type_doc_id: number, @Body() updateDto: UpdateTypeDocDto) {
        return this.typeDocService.updateTypeDoc(type_doc_id, updateDto);
    }

    @ApiOperation({summary: 'Удалить организацию'})
    @ApiResponse({status: 200, description: 'Организация успешно удалена'})
    @ApiResponse({status: 404, description: 'Организация не найдена'})
    @ApiParam({name: 'type_doc_id', type: Number, description: 'ID организации'})
    @Delete(':type_doc_id')
    delete(@Param('type_doc_id', ParseIntPipe) type_doc_id: number) {
        return this.typeDocService.deleteTypeDoc(type_doc_id);
    }
}

