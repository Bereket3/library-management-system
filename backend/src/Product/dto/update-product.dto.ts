/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ProductCategory } from './enum/ProductCategory';



export class UpdateProductDto {

 @IsNotEmpty()
 @IsString()
 id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @IsOptional()
  @IsNumber()
  newPrice?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
