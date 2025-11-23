import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateContractDto} from "./dto/create-contract.dto";
import {UpdateContractDto} from "./dto/update-contract.dto";
import {ContractService} from "./contract.service";
import {ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody} from "@nestjs/swagger";
import {Contract} from "./contract.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Контракты')
@Controller('contracts')
export class ContractController {
    constructor(private contractService: ContractService) {}

    @ApiOperation({summary: 'Создание контракта'})
    @ApiResponse({status: 200, type: Contract})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() contractDto: CreateContractDto) {
        return this.contractService.createContract(contractDto);
    }

    @ApiOperation({summary: 'Получить все контракты'})
    @ApiResponse({status: 200, type: [Contract]})
    @Get()
    getAll() {
        return this.contractService.getAllContracts();
    }

    @ApiOperation({summary: 'Получить контракт по ID'})
    @ApiResponse({status: 200, type: Contract})
    @ApiResponse({status: 404, description: 'Контракт не найден'})
    @ApiParam({name: 'contract_id', type: Number, description: 'ID контракта'})
    @Get(':contract_id')
    getById(@Param('contract_id', ParseIntPipe) contract_id: number) {
        return this.contractService.getContractById(contract_id);
    }

    @ApiOperation({summary: 'Обновить контракт'})
    @ApiResponse({status: 200, type: Contract})
    @ApiResponse({status: 404, description: 'Контракт не найден'})
    @ApiParam({name: 'contract_id', type: Number, description: 'ID контракта'})
    @ApiBody({type: UpdateContractDto})
    @UsePipes(ValidationPipe)
    @Put(':contract_id')
    update(@Param('contract_id', ParseIntPipe) contract_id: number, @Body() updateDto: UpdateContractDto) {
        return this.contractService.updateContract(contract_id, updateDto);
    }

    @ApiOperation({summary: 'Удалить контракт (мягкое удаление)'})
    @ApiResponse({status: 200, type: Contract})
    @ApiResponse({status: 404, description: 'Контракт не найден'})
    @ApiParam({name: 'id', type: Number, description: 'ID контракта'})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                deletion_user_id: {
                    type: 'number',
                    description: 'ID пользователя, удаляющего контракт'
                }
            },
            required: ['deletion_user_id']
        }
    })
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number, @Body('deletion_user_id', ParseIntPipe) deletionUserId: number) {
        return this.contractService.deleteContract(id, deletionUserId);
    }
}

