/* eslint-disable prettier/prettier */
import {  IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email:string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}

export class ApprovalDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsString()
  @IsOptional()
  readonly isApproved: string;
}

export class EmailDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}