import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateRegistryDto} from "./dto/create-registry.dto";
import {UpdateRegistryDto} from "./dto/update-registry.dto";
import {RegistryService} from "./registry.service";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Registry} from "./registry.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Реестр')
@Controller('registry')
export class RegistryController {
    constructor(private registryService: RegistryService) {}

    @ApiOperation({summary: 'Создание реестра'})
    @ApiResponse({status: 200, type: Registry})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() brandsDto: CreateRegistryDto) {
        return this.registryService.createRegistry(brandsDto);
    }

    @ApiOperation({summary: 'Получить реестры по ID договора'})
    @ApiResponse({status: 200, type: [Registry]})
    @ApiParam({name: 'contract_id', type: Number, description: 'ID реестра'})
    @Get(':contract_id')
    getByContractId(@Param('contract_id', ParseIntPipe) contractId: number) {
        return this.registryService.getRegistryByContractId(contractId);
    }

    @ApiOperation({summary: 'Обновить реестр'})
    @ApiResponse({status: 200, type: Registry})
    @ApiResponse({status: 404, description: 'Реестр не найдена'})
    @ApiParam({name: 'registry_id', type: Number, description: 'ID реестра'})
    @ApiBody({type: UpdateRegistryDto})
    @UsePipes(ValidationPipe)
    @Put(':registry_id')
    update(@Param('registry_id', ParseIntPipe) brand_id: number, @Body() updateDto: UpdateRegistryDto) {
        return this.registryService.updateRegistry(brand_id, updateDto);
    }

    @ApiOperation({summary: 'Удалить реестр (мягкое удаление)'})
    @ApiResponse({status: 200, type: Registry})
    @ApiResponse({status: 404, description: 'Реестр не найдена'})
    @ApiParam({name: 'registry_id', type: Number, description: 'ID реестра'})
    @Delete(':registry_id')
    delete(@Param('registry_id', ParseIntPipe) brand_id: number) {
        return this.registryService.deleteRegistry(brand_id);
    }
}


