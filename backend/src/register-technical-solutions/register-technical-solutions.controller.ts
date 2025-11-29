import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateRegisterTechnicalSolutionsDto} from "./dto/create-register-technical-solutions.dto";
import {UpdateRegisterTechnicalSolutionsDto} from "./dto/update-register-technical-solutions.dto";
import {RegisterTechnicalSolutionsService} from "./register-technical-solutions.service";
import {ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody} from "@nestjs/swagger";
import {TechnicalRegistry} from "./register-technical-solutions.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Реестр технических решений')
@Controller('registry_technical_solutions')
export class RegisterTechnicalSolutionsController {
    constructor(private registryTechnicalSolutionsService: RegisterTechnicalSolutionsService) {}

    @ApiOperation({summary: 'Создание реестра'})
    @ApiResponse({status: 200, type: TechnicalRegistry})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() registryDto: CreateRegisterTechnicalSolutionsDto) {
        return this.registryTechnicalSolutionsService.createRegistry(registryDto);
    }

    @ApiOperation({summary: 'Получить реестры по ID договора'})
    @ApiResponse({status: 200, type: [TechnicalRegistry]})
    @ApiParam({name: 'contract_id', type: Number, description: 'ID реестра'})
    @Get(':contract_id')
    getByContractId(@Param('contract_id', ParseIntPipe) contractId: number) {
        return this.registryTechnicalSolutionsService.getRegistryByContractId(contractId);
    }

    @ApiOperation({summary: 'Обновить реестр'})
    @ApiResponse({status: 200, type: TechnicalRegistry})
    @ApiResponse({status: 404, description: 'Реестр не найден'})
    @ApiParam({name: 'registry_technical_solutions', type: Number, description: 'ID реестра'})
    @ApiBody({type: UpdateRegisterTechnicalSolutionsDto})
    @UsePipes(ValidationPipe)
    @Put(':registry_technical_solutions')
    update(@Param('registry_technical_solutions', ParseIntPipe) id: number, @Body() updateDto: UpdateRegisterTechnicalSolutionsDto) {
        return this.registryTechnicalSolutionsService.updateRegistry(id, updateDto);
    }

    @ApiOperation({summary: 'Удалить Реестр (мягкое удаление)'})
    @ApiResponse({status: 200, type: TechnicalRegistry})
    @ApiResponse({status: 404, description: 'Реестр не найден'})
    @ApiParam({name: 'registry_technical_solutions', type: Number, description: 'ID реестра'})
    @Delete(':registry_technical_solutions')
    delete(@Param('registry_technical_solutions', ParseIntPipe) id: number) {
        return this.registryTechnicalSolutionsService.deleteRegistry(id);
    }
}


