import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory} from './entity/subcategory.entity';
import { SubcategoryResolver } from './subcategory.resolver';
import { SubcategoryService } from './subcategory.service';
import { Category } from '../category/entity/category.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategory,Category]),CategoryModule],
  providers: [SubcategoryResolver, SubcategoryService],
})
export class SubcategoryModule {}
