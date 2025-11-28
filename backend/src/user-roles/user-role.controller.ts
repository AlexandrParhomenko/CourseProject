import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ParseIntPipe} from '@nestjs/common';
import {CreateUserRoleDto} from "./dto/create-user-role.dto";
import {UpdateUserRoleDto} from "./dto/update-user-role.dto";
import {UserRoleService} from "./user-role.service";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserRoles} from "./user-role.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Роль-Пользователь')
@Controller('users_roles')
export class UserRoleController {
    constructor(private userRoleService: UserRoleService) {}

    @ApiOperation({summary: 'Создание связи'})
    @ApiResponse({status: 200, type: UserRoles})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userRoleDto: CreateUserRoleDto) {
        return this.userRoleService.createUserRole(userRoleDto);
    }

    @ApiOperation({summary: 'Получить связи по ID пользователя'})
    @ApiResponse({status: 200, type: [UserRoles]})
    @ApiParam({name: 'user_id', type: Number, description: 'ID пользователя'})
    @Get(':user_id')
    getByUserId(@Param('user_id', ParseIntPipe) userId: number) {
        return this.userRoleService.getUserRoleByUserId(userId);
    }

    @ApiOperation({summary: 'Обновить связь'})
    @ApiResponse({status: 200, type: UserRoles})
    @ApiResponse({status: 404, description: 'Связь не найдена'})
    @ApiParam({name: 'id', type: Number, description: 'ID связи'})
    @ApiBody({type: UpdateUserRoleDto})
    @UsePipes(ValidationPipe)
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateUserRoleDto) {
        return this.userRoleService.updateUserRole(id, updateDto);
    }

    @ApiOperation({summary: 'Удалить связь (мягкое удаление)'})
    @ApiResponse({status: 200, type: UserRoles})
    @ApiResponse({status: 404, description: 'Связь не найдена'})
    @ApiParam({name: 'id', type: Number, description: 'ID связи'})
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userRoleService.deleteUserRole(id);
    }
}


