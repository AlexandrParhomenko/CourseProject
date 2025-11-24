import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateConsultationDto} from "./dto/create-consultation.dto";
import {UpdateConsultationDto} from "./dto/update-consultation.dto";
import {ConsultationsService} from "./consultations.service";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Consultation} from "./consultation.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Консультации')
@Controller('consultations')
export class ConsultationsController {
    constructor(private consultationsService: ConsultationsService) {}

    @ApiOperation({summary: 'Создание консультации'})
    @ApiResponse({status: 200, type: Consultation})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() consultationDto: CreateConsultationDto) {
        return this.consultationsService.createConsultation(consultationDto);
    }

    @ApiOperation({summary: 'Получить консультации по ID договора'})
    @ApiResponse({status: 200, type: [Consultation]})
    @ApiParam({name: 'contract_id', type: Number, description: 'ID договора'})
    @Get(':contract_id')
    getByContractId(@Param('contract_id', ParseIntPipe) contractId: number) {
        return this.consultationsService.getConsultationsByContractId(contractId);
    }

    @ApiOperation({summary: 'Обновить консультацию'})
    @ApiResponse({status: 200, type: Consultation})
    @ApiResponse({status: 404, description: 'Консультация не найдена'})
    @ApiParam({name: 'id', type: Number, description: 'ID консультации'})
    @ApiBody({type: UpdateConsultationDto})
    @UsePipes(ValidationPipe)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateConsultationDto) {
        return this.consultationsService.updateConsultation(id, updateDto);
    }

    @ApiOperation({summary: 'Удалить консультацию (мягкое удаление)'})
    @ApiResponse({status: 200, type: Consultation})
    @ApiResponse({status: 404, description: 'Консультация не найдена'})
    @ApiParam({name: 'id', type: Number, description: 'ID консультации'})
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.consultationsService.deleteConsultation(id);
    }
}


