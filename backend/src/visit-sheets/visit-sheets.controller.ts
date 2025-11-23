import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateVisitSheetDto} from "./dto/create-visit-sheet.dto";
import {UpdateVisitSheetDto} from "./dto/update-visit-sheet.dto";
import {VisitSheetsService} from "./visit-sheets.service";
import {ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody} from "@nestjs/swagger";
import {VisitSheet} from "./visit-sheet.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Листы посещений')
@Controller('visit-sheets')
export class VisitSheetsController {
    constructor(private visitSheetsService: VisitSheetsService) {}

    @ApiOperation({summary: 'Создание листа посещений'})
    @ApiResponse({status: 200, type: VisitSheet})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() visitSheetDto: CreateVisitSheetDto) {
        return this.visitSheetsService.createVisitSheet(visitSheetDto);
    }

    @ApiOperation({summary: 'Получить листы посещений по ID договора'})
    @ApiResponse({status: 200, type: [VisitSheet]})
    @ApiParam({name: 'contract_id', type: Number, description: 'ID договора'})
    @Get(':contract_id')
    getByContractId(@Param('contract_id', ParseIntPipe) contractId: number) {
        return this.visitSheetsService.getVisitSheetsByContractId(contractId);
    }

    @ApiOperation({summary: 'Обновить лист посещений'})
    @ApiResponse({status: 200, type: VisitSheet})
    @ApiResponse({status: 404, description: 'Лист посещений не найден'})
    @ApiParam({name: 'id', type: Number, description: 'ID листа посещений'})
    @ApiBody({type: UpdateVisitSheetDto})
    @UsePipes(ValidationPipe)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateVisitSheetDto) {
        return this.visitSheetsService.updateVisitSheet(id, updateDto);
    }

    @ApiOperation({summary: 'Удалить лист посещений (мягкое удаление)'})
    @ApiResponse({status: 200, type: VisitSheet})
    @ApiResponse({status: 404, description: 'Лист посещений не найден'})
    @ApiParam({name: 'id', type: Number, description: 'ID листа посещений'})
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.visitSheetsService.deleteVisitSheet(id);
    }
}

