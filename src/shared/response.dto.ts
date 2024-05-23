import { HttpException, HttpStatus, Type, applyDecorators } from "@nestjs/common"
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from "@nestjs/swagger"


export const ResponseError = (messages:String[])=>{

    return { error: messages }
}
export class ResponseDTO<T>{
    @ApiProperty({type:Number,description:"200, 201,401,403,500 HTTP_STATUS"})
    statusCode:number

    @ApiProperty({type:[String],description:"Messages"})
    message:string[]

    @ApiProperty({type:Object,description:"Messages"})
    data:T
}
export class ResponseErrorDTO<T>{
  @ApiProperty({type:Number,description:"200, 201,401,403,500 HTTP_STATUS"})
  statusCode:number

  @ApiProperty({type:[String],description:"Messages"})
  message:string[]
}

export class ResponsePaginateDTO<T>{
    @ApiProperty({type:Number,description:"200, 201,401,403,500 HTTP_STATUS"})
    statusCode:number

    @ApiProperty({type:[String],description:"Messages"})
    message:string[]

    @ApiProperty({
        description: 'Data object of type T',
        })
    data:T[]
    @ApiProperty({type:Number,description:"Pagina actual"})
    page:number
    @ApiProperty({type:Number,description:"total items"})
    total:number
   
}


export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
  applyDecorators(
    ApiExtraModels(ResponsePaginateDTO, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponsePaginateDTO) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  )


  export const ApiOkResponseDTO = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
    applyDecorators(
      ApiExtraModels(ResponseDTO, dataDto),
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDTO) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(dataDto) },
                },
              },
            },
          ],
        },
      }),
    )