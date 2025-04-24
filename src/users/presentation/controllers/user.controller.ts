import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiBadRequest } from '~/shared/infrastructure/decorators/swagger-api-bad-request.decorator copy';
import { SwaggerApiForbidden } from '~/shared/infrastructure/decorators/swagger-api-forbidden.decorator';
import { SwaggerApiInternalServerError } from '~/shared/infrastructure/decorators/swagger-api-internal-server-error.decorator';
import { CreateUserCommand } from '~/users/application/commands/create-user-command';
import { UpdateUserCommand } from '~/users/application/commands/update-user-command';
import { ListUsersDto } from '~/users/application/dtos/listusers.dto';
import { SignUpDto } from '~/users/application/dtos/signup.dto';
import { UpdateUserDto } from '~/users/application/dtos/update-user.dto';
import { SearchUsersQuery } from '~/users/application/queries/search-users.query';
import { GetUser } from '~/users/application/usecases/getuser.usecase';
import { ListUsers } from '~/users/application/usecases/listusers.usecase';
import { SignUp } from '~/users/application/usecases/signup.usecase';
import { UpdateUser } from '~/users/application/usecases/update-user.usecase';
import { SwaggerApiUsersListOutputResponse } from '~/users/infrastructure/decorators/swagger/swagger-api-user-list-output-response.decorator';
import { SwaggerApiUserOutputResponse } from '~/users/infrastructure/decorators/swagger/swagger-api-user-output-response.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private signUpUseCase: SignUp.Usecase,
    private getUserUseCase: GetUser.Usecase,
    private listUsersUseCase: ListUsers.Usecase,
    private updateUserUseCase: UpdateUser.Usecase,
  ) {}

  @Post('/')
  @SwaggerApiBadRequest()
  @SwaggerApiForbidden()
  @SwaggerApiInternalServerError()
  @SwaggerApiUserOutputResponse({ status: 201 })
  async create(@Body() signUpDto: SignUpDto | undefined) {
    try {
      const command = CreateUserCommand.fromObject(signUpDto);
      const user = await this.signUpUseCase.execute(command);
      return user;
    } catch (e) {
      const error = e as Error;
      throw new BadRequestException(error.message);
    }
  }

  @Get('/')
  @SwaggerApiBadRequest()
  @SwaggerApiForbidden()
  @SwaggerApiInternalServerError()
  @SwaggerApiUsersListOutputResponse()
  search(@Query() params: ListUsersDto) {
    try {
      const query = SearchUsersQuery.fromObject(params);
      return this.listUsersUseCase.execute(query);
    } catch (e) {
      const error = e as Error;
      throw new BadRequestException(error.message);
    }
  }

  @Get('/:id')
  @SwaggerApiBadRequest()
  @SwaggerApiForbidden()
  @SwaggerApiInternalServerError()
  @SwaggerApiUserOutputResponse()
  findOne(@Param('id') id: string) {
    try {
      return this.getUserUseCase.execute({ id });
    } catch (e) {
      const error = e as Error;
      throw new BadRequestException(error.message);
    }
  }

  @Put('/:id')
  @SwaggerApiBadRequest()
  @SwaggerApiForbidden()
  @SwaggerApiInternalServerError()
  @SwaggerApiUserOutputResponse()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const command = UpdateUserCommand.fromObject(updateUserDto);
      return await this.updateUserUseCase.execute(command);
    } catch (e) {
      const error = e as Error;
      throw new BadRequestException(error.message);
    }
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.UserService.remove(+id);
  // }
}
