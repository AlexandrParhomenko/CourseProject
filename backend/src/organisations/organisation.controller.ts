import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateOrganisationDto} from "./dto/create-organisation.dto";
import {UpdateOrganisationDto} from "./dto/update-organisation.dto";
import {OrganisationService} from "./organisation.service";
import {ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody} from "@nestjs/swagger";
import {ValidationPipe} from "../pipes/validation.pipe";
import {Organization} from "./organisation.model";

@ApiTags('Организации')
@Controller('organization')
export class OrganisationController {
    constructor(private objectsService: OrganisationService) {}

    @ApiOperation({summary: 'Создание организации'})
    @ApiResponse({status: 200, type: Organization})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() objectDto: CreateOrganisationDto) {
        return this.objectsService.createOrganisation(objectDto);
    }

    @ApiOperation({summary: 'Получить организацию по ID'})
    @ApiResponse({status: 200, type: Organization})
    @ApiResponse({status: 404, description: 'Объект не найден'})
    @ApiParam({name: 'organization_id', type: Number, description: 'ID объекта'})
    @Get('/:organization_id')
    getById(@Param('organization_id', ParseIntPipe) organization_id: number) {
        return this.objectsService.getOrganisation(organization_id);
    }

    @ApiOperation({summary: 'Получить организации по ID договора'})
    @ApiResponse({status: 200, type: [Organization]})
    @ApiParam({name: 'contract_id', type: Number, description: 'ID договора'})
    @Get('contracts/:contract_id')
    getByContractId(@Param('contract_id', ParseIntPipe) contractId: number) {
        return this.objectsService.getOrganisationsByContractId(contractId);
    }

    @ApiOperation({summary: 'Обновить организацию'})
    @ApiResponse({status: 200, type: Organization})
    @ApiResponse({status: 404, description: 'Организация не найдена'})
    @ApiParam({name: 'id', type: Number, description: 'ID организации'})
    @ApiBody({type: UpdateOrganisationDto})
    @UsePipes(ValidationPipe)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateOrganisationDto) {
        return this.objectsService.updateOrganisation(id, updateDto);
    }

    @ApiOperation({summary: 'Удалить организацию'})
    @ApiResponse({status: 200, description: 'Организация успешно удалена'})
    @ApiResponse({status: 404, description: 'Организация не найдена'})
    @ApiParam({name: 'id', type: Number, description: 'ID организации'})
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.objectsService.deleteOrganisation(id);
    }
}

