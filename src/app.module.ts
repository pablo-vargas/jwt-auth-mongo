import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG, MONGO_CONFIG } from './shared/config-global';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './middleware/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    JwtModule.register(JWT_CONFIG),
    MongooseModule.forRoot(MONGO_CONFIG)
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
