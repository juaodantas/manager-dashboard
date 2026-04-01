import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserHttpDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string
}

export class UpdateUserHttpDto {
  @ApiPropertyOptional({ example: 'Jane Doe' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ example: 'newpassword123' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string
}
