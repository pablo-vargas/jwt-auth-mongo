import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO, ResponseErrorDTO } from 'src/shared/response.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/middleware/auth.guard';
import { AuthModel } from 'src/model/auth.schema';
import { AuthSigInDTO, AuthSigInResponseDTO } from './dto/auth.dto';

@Controller('auth')
@ApiTags("AUTENTICACION")
@ApiBearerAuth("authorization")
@ApiOkResponse({type:ResponseDTO})
@ApiBadRequestResponse({ type: ResponseErrorDTO })
export class AuthController {

    constructor(private authService:AuthService){}


    @ApiResponse({ type: AuthSigInResponseDTO })
    @ApiOperation({ summary: 'LOGIN', description: '' })
    @Public()
    @ApiOkResponse({type:AuthSigInResponseDTO})
    @Post('login')
    async signIn(@Body() data: AuthSigInDTO) {
        let result = await this.authService.login(data)
        if ('error' in result) throw new HttpException({ statusCode: HttpStatus.FORBIDDEN, message: result.error }, HttpStatus.FORBIDDEN);

        return {
            statusCode: HttpStatus.OK,
            message: ["OK"],
            token:result.token
        }
    }


    @ApiResponse({ type: AuthSigInResponseDTO })
    @ApiOperation({ summary: 'REFRESH TOKEN', description: '' })
    @ApiOkResponse({type:AuthSigInResponseDTO})
    @Get('refres-token')
    async refreshToken(@Req() data: any) {
        let {user} =data
        console.log(user)

        let result = await this.authService.refreshToken(user)
        if ('error' in result) throw new HttpException({ statusCode: HttpStatus.FORBIDDEN, message: result.error }, HttpStatus.FORBIDDEN);

        return {
            statusCode: HttpStatus.OK,
            message: ["OK"],
            token:result.token
        }
    }


    @ApiResponse({ type: AuthSigInResponseDTO })
    @ApiOperation({ summary: 'VALID TOKEN', description: '' })
    @ApiOkResponse({type:AuthSigInResponseDTO})
    @Get('valid-token')
    async validToken(@Req() data: any) {
        let {user} = data
        return {
            statusCode: HttpStatus.OK,
            message: ["TOKEN VALIDO HASTA "+new Date(user.exp*1000)],
        }
    }


    @ApiOperation({ summary: 'Servicio de prueba para crear usuario.', description: '' })
    @Post('create')
    @Public()
    @HttpCode(200)
    async sendVerifyEmail(@Body() data: AuthModel) {

        let result = await  this.authService.create(data)
        if ('error' in result) throw new HttpException({ statusCode: HttpStatus.FORBIDDEN, message: result.error }, HttpStatus.FORBIDDEN);
      
        return {
            statusCode: HttpStatus.OK,
            message: ["Usuario creado correctamente"],
            data:result
        }
    }


}
