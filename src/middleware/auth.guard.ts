import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    SetMetadata,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT_CONFIG } from 'src/shared/config-global';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        Logger.log(`**************************** JWT **************`)
        console.log(token)
        if (!token) {
            throw new HttpException({ statusCode: HttpStatus.UNAUTHORIZED, message: ["Token inválido."] }, HttpStatus.UNAUTHORIZED)
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: JWT_CONFIG.secret
                }
            );
            request['user'] = payload;
        } catch {
            throw new HttpException({ statusCode: HttpStatus.UNAUTHORIZED, message: ["Token expirado."] }, HttpStatus.UNAUTHORIZED)
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
