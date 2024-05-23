import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from 'src/model/auth.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    MongooseModule.forFeature([
      {
        name:AuthModel.name,
        schema:AuthSchema
      }
    ],)
  ]
})
export class AuthModule {}
