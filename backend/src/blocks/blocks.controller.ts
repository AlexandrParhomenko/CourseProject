import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateBlockDto} from "./dto/create-block.dto";
import {UpdateBlockDto} from "./dto/update-block.dto";
import {BlocksService} from "./blocks.service";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Block} from "./block.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Блоки')
@Controller('blocks')
export class BlocksController {
    constructor(private blocksService: BlocksService) {}

    @ApiOperation({summary: 'Создание блока'})
    @ApiResponse({status: 200, type: Block})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() blockDto: CreateBlockDto) {
        return this.blocksService.createBlock(blockDto);
    }

    @ApiOperation({summary: 'Получить блоки по ID договора'})
    @ApiResponse({status: 200, type: [Block]})
    @ApiParam({name: 'contract_id', type: Number, description: 'ID договора'})
    @Get(':contract_id')
    getByContractId(@Param('contract_id', ParseIntPipe) contractId: number) {
        return this.blocksService.getBlocksByContractId(contractId);
    }

    @ApiOperation({summary: 'Обновить блок'})
    @ApiResponse({status: 200, type: Block})
    @ApiResponse({status: 404, description: 'Блок не найден'})
    @ApiParam({name: 'id', type: Number, description: 'ID блока'})
    @ApiBody({type: UpdateBlockDto})
    @UsePipes(ValidationPipe)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateBlockDto) {
        return this.blocksService.updateBlock(id, updateDto);
    }

    @ApiOperation({summary: 'Удалить блок (мягкое удаление)'})
    @ApiResponse({status: 200, type: Block})
    @ApiResponse({status: 404, description: 'Блок не найден'})
    @ApiParam({name: 'id', type: Number, description: 'ID блока'})
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.blocksService.deleteBlock(id);
    }
}

