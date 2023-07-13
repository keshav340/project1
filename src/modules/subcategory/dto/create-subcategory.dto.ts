// create-subcategory.dto.ts

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubcategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
