import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Message } from 'src/shared/messages-validator';

export type AuthDocument = HydratedDocument<AuthModel>;

@Schema({ collection: 'users' })
export class AuthModel {

    @Prop({ required: true })
    @ApiProperty({description:'username',type:String})
    @IsNotEmpty({message:Message.isNotEmpty})
    @IsString({message:Message.isString})
    username: string;

    @ApiProperty({description:'NOMBRES',type:String})
    @IsNotEmpty({message:Message.isNotEmpty})
    @IsString({message:Message.isString})
    @Prop({ required: true })
    name: string;


    @ApiProperty({description:'NOMBRES',type:String})
    @IsNotEmpty({message:Message.isNotEmpty})
    @IsString({message:Message.isString})
    @MinLength(8,{message:Message.minLength})
    @Prop({ required: true })
    password: string;

    @Prop()
    @ApiProperty({description:'APELLIDOS',type:String})
    @IsNotEmpty({message:Message.isNotEmpty})
    @IsString({message:Message.isString})
    lastName: string;

    @ApiProperty({description:'ESTATUS',type:Number})
    @IsOptional()
    @IsNumber({},{message:Message.isNumber})
    @Prop()
    status: number;


    @Prop()
    id: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);