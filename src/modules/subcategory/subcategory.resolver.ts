import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryType } from './subcategory.type';
import { CreateSubcategoryInput, UpdateSubcategoryInput } from './subcategory.input';
import { NotFoundException } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import Role from 'src/modules/enums/roles.enum'


@Resolver(() => SubcategoryType)
export class SubcategoryResolver {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Query(() => SubcategoryType)
  async getSubcategoryById(@Args('id', { type: () => Int }) id: number): Promise<SubcategoryType> {
    return this.subcategoryService.getSubcategoryById(id);
  }

  @Mutation(() => SubcategoryType)
  //@UseGuards(RolesGuard)
  //@Roles(Role.ADMIN, Role.EDITOR)
  async createSubcategory(
    @Args('subcategoryInput') subcategoryInput: CreateSubcategoryInput,
  ): Promise<SubcategoryType> {
    return this.subcategoryService.createSubcategory(subcategoryInput);
  }

  @Mutation(() => SubcategoryType)
  //@UseGuards(RolesGuard)
  //@Roles(Role.ADMIN, Role.EDITOR)
  async updateSubcategory(
    @Args('updateSubcategoryInput') updateSubcategoryInput: UpdateSubcategoryInput,
  ): Promise<SubcategoryType> {
    return this.subcategoryService.updateSubcategory(updateSubcategoryInput);
  }

  @Mutation(() => Boolean)
  //@UseGuards(RolesGuard)
 // @Roles(Role.ADMIN, Role.EDITOR)
  async deleteSubcategory(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    const deleted = await this.subcategoryService.deleteSubcategory(id);
    
    if (!deleted) {
      throw new NotFoundException('Subcategory not found');
    }

    return true;
  }
}

