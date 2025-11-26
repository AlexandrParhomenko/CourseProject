import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateOrganisationContactPersonDto} from "./dto/create-organisation-contact-person.dto";
import {UpdateOrganisationContactPersonDto} from "./dto/update-organisation-contact-person.dto";
import {OrganisationContactPersonService} from "./organisation-contact-person.service";
import {ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody} from "@nestjs/swagger";
import {ValidationPipe} from "../pipes/validation.pipe";
import {OrganizationContact} from "./organisation-contact-person.model";

@ApiTags('Организации основное')
@Controller('organization_contact_person')
export class OrganisationContactPersonController {
    constructor(private organisationPersonService: OrganisationContactPersonService) {}

    @ApiOperation({summary: 'Создание организации'})
    @ApiResponse({status: 200, type: OrganizationContact})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() objectDto: CreateOrganisationContactPersonDto) {
        return this.organisationPersonService.createOrganisationContact(objectDto);
    }

    @ApiOperation({summary: 'Получить организацию по ID'})
    @ApiResponse({status: 200, type: OrganizationContact})
    @ApiResponse({status: 404, description: 'Организация не найдена'})
    @ApiParam({name: 'organization_contact_person_id', type: Number, description: 'ID организации'})
    @Get('/:organization_contact_person_id')
    getById(@Param('organization_contact_person_id', ParseIntPipe) organization_contact_person_id: number) {
        return this.organisationPersonService.getOrganisationContactById(organization_contact_person_id);
    }

    @ApiOperation({summary: 'Получить организации по ID договора'})
    @ApiResponse({status: 200, type: [OrganizationContact]})
    @ApiParam({name: 'contract_id', type: Number, description: 'ID договора'})
    @Get('contracts/:contract_id')
    getByContractId(@Param('contract_id', ParseIntPipe) contractId: number) {
        return this.organisationPersonService.getOrganisationsContactsByContractId(contractId);
    }

    @ApiOperation({summary: 'Обновить организацию'})
    @ApiResponse({status: 200, type: OrganizationContact})
    @ApiResponse({status: 404, description: 'Организация не найдена'})
    @ApiParam({name: 'organization_contact_person_id', type: Number, description: 'ID организации'})
    @ApiBody({type: UpdateOrganisationContactPersonDto})
    @UsePipes(ValidationPipe)
    @Put(':organization_contact_person_id')
    update(@Param('organization_contact_person_id', ParseIntPipe) id: number, @Body() updateDto: UpdateOrganisationContactPersonDto) {
        return this.organisationPersonService.updateOrganisation(id, updateDto);
    }

    @ApiOperation({summary: 'Удалить организацию'})
    @ApiResponse({status: 200, description: 'Организация успешно удалена'})
    @ApiResponse({status: 404, description: 'Организация не найдена'})
    @ApiParam({name: 'organization_contact_person_id', type: Number, description: 'ID организации'})
    @Delete(':organization_contact_person_id')
    delete(@Param('organization_contact_person_id', ParseIntPipe) id: number) {
        return this.organisationPersonService.deleteOrganisation(id);
    }
}

