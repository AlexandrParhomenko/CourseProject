import {Controller, Get} from '@nestjs/common';
import {AbbreveBrandService} from "./abbreve-brand.service";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AbbreveBrand} from "./abbreve-brand.model";

@ApiTags('Сокращенные наименования марок')
@Controller('abbreve_brands')
export class AbbreveBrandController {
    constructor(private abbreveBrandsService: AbbreveBrandService) {}

    @ApiOperation({summary: 'Получить сокр бренды'})
    @ApiResponse({status: 200, type: AbbreveBrand})
    @ApiResponse({status: 404, description: 'Бренд не найден'})
    @Get('/')
    getTypeDocs() {
        return this.abbreveBrandsService.getAbbreve();
    }
}

