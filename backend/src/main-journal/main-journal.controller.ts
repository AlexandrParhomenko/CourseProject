import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateMainJournalDto} from "./dto/create-main-journal.dto";
import {UpdateMainJournalDto} from "./dto/update-main-journal.dto";
import {MainJournalService} from "./main-journal.service";
import {ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody} from "@nestjs/swagger";
import {MainJournal} from "./main-journal.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Журнал авторского надзора')
@Controller('main_journal')
export class MainJournalController {
    constructor(private mainJournalService: MainJournalService) {}

    @ApiOperation({summary: 'Создание журнала'})
    @ApiResponse({status: 200, type: MainJournal})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() specialistDto: CreateMainJournalDto) {
        return this.mainJournalService.createMainJournal(specialistDto);
    }

    @ApiOperation({summary: 'Получить журналы по ID договора'})
    @ApiResponse({status: 200, type: [MainJournal]})
    @ApiParam({name: 'contract_id', type: Number, description: 'ID журнала'})
    @Get(':contract_id')
    getByContractId(@Param('contract_id', ParseIntPipe) contractId: number) {
        return this.mainJournalService.getMainJournalsByContractId(contractId);
    }

    @ApiOperation({summary: 'Обновить журнал'})
    @ApiResponse({status: 200, type: MainJournal})
    @ApiResponse({status: 404, description: 'Журнал не найден'})
    @ApiParam({name: 'main_journal_id', type: Number, description: 'ID журнала'})
    @ApiBody({type: UpdateMainJournalDto})
    @UsePipes(ValidationPipe)
    @Put(':main_journal_id')
    update(@Param('main_journal_id', ParseIntPipe) id: number, @Body() updateDto: UpdateMainJournalDto) {
        return this.mainJournalService.updateMainJournal(id, updateDto);
    }

    @ApiOperation({summary: 'Удалить Журнал (мягкое удаление)'})
    @ApiResponse({status: 200, type: MainJournal})
    @ApiResponse({status: 404, description: 'Журнал не найден'})
    @ApiParam({name: 'main_journal_id', type: Number, description: 'ID журнала'})
    @Delete(':main_journal_id')
    delete(@Param('main_journal_id', ParseIntPipe) id: number) {
        return this.mainJournalService.deleteMainJournal(id);
    }
}


