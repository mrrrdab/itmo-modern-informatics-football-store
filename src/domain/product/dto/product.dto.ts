import { IsString, IsNumber, IsEnum, IsInt } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { ProductCategory, AgeCategory, Gender, Club } from '@prisma/client';

class Product {
  @ApiProperty({ description: 'Product id' })
  @IsInt()
  id: string;

  @ApiProperty({ description: 'Product name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Product description' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Product category', enum: ProductCategory, example: ProductCategory.UPPER_CLOTHING })
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @ApiProperty({
    description: 'The Football Club associated with the product',
    enum: Club,
    example: Club.BAYERN_MUNICH,
  })
  @IsEnum(Club)
  club: Club;

  @ApiProperty({ description: 'The target age group for the product', enum: AgeCategory, example: AgeCategory.ADULT })
  @IsEnum(AgeCategory)
  age: AgeCategory;

  @ApiProperty({
    description: 'The gender category for which the product is designed',
    enum: Gender,
    example: Gender.UNISEX,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ description: 'The number of items available in stock', example: 100 })
  @IsNumber()
  stockQuantity: number;
}

export class GetProductDTO extends Product {}

export class CreateProductDTO extends OmitType(Product, ['id']) {}

export class UpdateProductDTO extends PartialType(OmitType(Product, ['id'])) {}
