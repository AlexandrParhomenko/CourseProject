import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import {VisitSheetsOcpService} from "./visit-sheets-ocp.service";
import {ApiOperation, ApiResponse, ApiTags, ApiParam} from "@nestjs/swagger";
import {VisitSheetOCP} from "./visit-sheet-ocp.model";

@ApiTags('Связь посещений')
@Controller('visit_sheet_organization_contact_person')
export class VisitSheetsOcpController {
    constructor(private visitSheetsService: VisitSheetsOcpService) {}
    @ApiOperation({summary: 'Получить связь листов посещений по ID листа'})
    @ApiResponse({status: 200, type: [VisitSheetOCP]})
    @ApiParam({name: 'visit_sheet_id', type: Number, description: 'ID листа'})
    @Get(':visit_sheet_id')
    getByContractId(@Param('visit_sheet_id', ParseIntPipe) visitSheetId: number) {
        return this.visitSheetsService.getVisitSheetsByListId(visitSheetId);
    }
}

