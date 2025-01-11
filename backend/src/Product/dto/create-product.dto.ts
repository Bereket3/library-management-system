/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { ProductCategory } from './enum/ProductCategory';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsNotEmpty()
  @IsString()
  image: string;

  
  @IsNumber()
  oldPrice: number;

 
  @IsNumber()
  newPrice: number;

 
  @IsNumber()
  quantity: number;
}
