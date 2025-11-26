import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateDefectDto} from "./dto/create-defect.dto";
import {UpdateDefectDto} from "./dto/update-defect.dto";
import {DefectService} from "./defect.service";
import {ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody} from "@nestjs/swagger";
import {ValidationPipe} from "../pipes/validation.pipe";
import {Defect} from "./defect.model";

@ApiTags('Значимость нарушений')
@Controller('importance_defects')
export class DefectController {
    constructor(private defectsService: DefectService) {}

    @ApiOperation({summary: 'Создание значимости'})
    @ApiResponse({status: 200, type: Defect})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() objectDto: CreateDefectDto) {
        return this.defectsService.createDefectPerson(objectDto);
    }

    @ApiOperation({summary: 'Получить значимости'})
    @ApiResponse({status: 200, type: Defect})
    @ApiResponse({status: 404, description: 'Значимость не найдена'})
    @Get('/')
    getDefects() {
        return this.defectsService.getDefects();
    }

    @ApiOperation({summary: 'Получить значимости по ID'})
    @ApiResponse({status: 200, type: Defect})
    @ApiResponse({status: 404, description: 'Значимость не найдена'})
    @ApiParam({name: 'importance_defect_id', type: Number, description: 'ID значимости'})
    @Get('/:importance_defect_id')
    getById(@Param('importance_defect_id', ParseIntPipe) importance_defect_id: number) {
        return this.defectsService.getDefectById(importance_defect_id);
    }

    @ApiOperation({summary: 'Обновить Значимость'})
    @ApiResponse({status: 200, type: Defect})
    @ApiResponse({status: 404, description: 'Значимость не найдена'})
    @ApiParam({name: 'importance_defect_id', type: Number, description: 'ID значимости'})
    @ApiBody({type: UpdateDefectDto})
    @UsePipes(ValidationPipe)
    @Put(':importance_defect_id')
    update(@Param('importance_defect_id', ParseIntPipe) importance_defect_id: number, @Body() updateDto: UpdateDefectDto) {
        return this.defectsService.updateDefect(importance_defect_id, updateDto);
    }

    @ApiOperation({summary: 'Удалить организацию'})
    @ApiResponse({status: 200, description: 'Организация успешно удалена'})
    @ApiResponse({status: 404, description: 'Организация не найдена'})
    @ApiParam({name: 'importance_defect_id', type: Number, description: 'ID организации'})
    @Delete(':importance_defect_id')
    delete(@Param('importance_defect_id', ParseIntPipe) importance_defect_id: number) {
        return this.defectsService.deleteDefect(importance_defect_id);
    }
}

