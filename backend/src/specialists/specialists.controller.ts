import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateSpecialistDto} from "./dto/create-specialist.dto";
import {UpdateSpecialistDto} from "./dto/update-specialist.dto";
import {SpecialistsService} from "./specialists.service";
import {ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody} from "@nestjs/swagger";
import {Specialist} from "./specialist.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Специалисты')
@Controller('specialists')
export class SpecialistsController {
    constructor(private specialistsService: SpecialistsService) {}

    @ApiOperation({summary: 'Создание специалиста'})
    @ApiResponse({status: 200, type: Specialist})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() specialistDto: CreateSpecialistDto) {
        return this.specialistsService.createSpecialist(specialistDto);
    }

    @ApiOperation({summary: 'Получить специалистов по ID договора'})
    @ApiResponse({status: 200, type: [Specialist]})
    @ApiParam({name: 'contract_id', type: Number, description: 'ID договора'})
    @Get(':contract_id')
    getByContractId(@Param('contract_id', ParseIntPipe) contractId: number) {
        return this.specialistsService.getSpecialistsByContractId(contractId);
    }

    @ApiOperation({summary: 'Обновить специалиста'})
    @ApiResponse({status: 200, type: Specialist})
    @ApiResponse({status: 404, description: 'Специалист не найден'})
    @ApiParam({name: 'id', type: Number, description: 'ID специалиста'})
    @ApiBody({type: UpdateSpecialistDto})
    @UsePipes(ValidationPipe)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateSpecialistDto) {
        return this.specialistsService.updateSpecialist(id, updateDto);
    }

    @ApiOperation({summary: 'Удалить специалиста (мягкое удаление)'})
    @ApiResponse({status: 200, type: Specialist})
    @ApiResponse({status: 404, description: 'Специалист не найден'})
    @ApiParam({name: 'id', type: Number, description: 'ID специалиста'})
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.specialistsService.deleteSpecialist(id);
    }
}


