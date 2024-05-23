import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MinLength } from "class-validator"
import { Message } from "src/shared/messages-validator"

export class AuthSigInDTO {
    @IsNotEmpty({message:Message.isNotEmpty})
    @ApiProperty({
        type: String,
        description: "Email"
    })
    username: string

    @IsString({message:Message.isString})
    @IsNotEmpty({message:Message.isNotEmpty})
    @MinLength(8,{message:Message.minLength})
    @ApiProperty({
        type: String,
        description: "Password"
    })
    password: string
}

export class AuthSigInResponseDTO {
    @ApiProperty({
        type: Number,
        description: "HTTP_STATUS 200,400,403,500"
    })
    statusCode: number

    @ApiProperty({
        type: [String],
        description: "ERORES"
    })
    message: string[]
    @ApiProperty({
        type: String,
        description: "JWT BASE 64"
    })
    token: string
}