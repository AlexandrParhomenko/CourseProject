import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateBrandDto} from "./dto/create-brand.dto";
import {UpdateBrandDto} from "./dto/update-brand.dto";
import {BrandsService} from "./brands.service";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Brands} from "./brands.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Марки')
@Controller('brands')
export class BrandsController {
    constructor(private brandsService: BrandsService) {}

    @ApiOperation({summary: 'Создание марки'})
    @ApiResponse({status: 200, type: Brands})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() brandsDto: CreateBrandDto) {
        return this.brandsService.createBrand(brandsDto);
    }

    @ApiOperation({summary: 'Получить марки по ID договора'})
    @ApiResponse({status: 200, type: [Brands]})
    @ApiParam({name: 'contract_id', type: Number, description: 'ID договора'})
    @Get(':contract_id')
    getByContractId(@Param('contract_id', ParseIntPipe) contractId: number) {
        return this.brandsService.getBrandsByContractId(contractId);
    }

    @ApiOperation({summary: 'Обновить марку'})
    @ApiResponse({status: 200, type: Brands})
    @ApiResponse({status: 404, description: 'Марка не найдена'})
    @ApiParam({name: 'brand_id', type: Number, description: 'ID марки'})
    @ApiBody({type: UpdateBrandDto})
    @UsePipes(ValidationPipe)
    @Put(':brand_id')
    update(@Param('brand_id', ParseIntPipe) brand_id: number, @Body() updateDto: UpdateBrandDto) {
        return this.brandsService.updateBrand(brand_id, updateDto);
    }

    @ApiOperation({summary: 'Удалить марку (мягкое удаление)'})
    @ApiResponse({status: 200, type: Brands})
    @ApiResponse({status: 404, description: 'Марка не найдена'})
    @ApiParam({name: 'brand_id', type: Number, description: 'ID марки'})
    @Delete(':brand_id')
    delete(@Param('brand_id', ParseIntPipe) brand_id: number) {
        return this.brandsService.deleteBrand(brand_id);
    }
}


