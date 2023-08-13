import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MetaService } from './meta.service';
import { Meta, CreateMetaResponse, UpdateMetaResponse, DeleteMetaResponse } from 'src/modules/meta/schema/schema';
import { CreateMetaArgs, UpdateMetaArgs, DeleteMetaArgs } from 'src/modules/meta/args/args';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import Role from "src/modules/enums/roles.enum"

@Resolver(() => Meta)
export class MetaResolver {
  constructor(private readonly metaService: MetaService) {}

  @Query(() => [Meta])
  async getAllMeta(): Promise<Meta[]> {
    return this.metaService.findAll();
  }

  @Query(() => Meta)
  async getMetaById(@Args('id') id: number): Promise<Meta> {
    return this.metaService.findById(id);
  }
  
  @Mutation(() => CreateMetaResponse)
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN, Role.EDITOR)
  async createMeta(@Args() { metaTitle, metaDescription }: CreateMetaArgs): Promise<CreateMetaResponse> {
    const meta = await this.metaService.create(metaTitle, metaDescription);
    return { meta };
  }
  

  @Mutation(() => UpdateMetaResponse)
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN, Role.EDITOR)
  async updateMeta(@Args() { id, metaTitle, metaDescription }: UpdateMetaArgs): Promise<UpdateMetaResponse> {
    const meta = await this.metaService.update(id, metaTitle, metaDescription);
    return { meta };
  }

  @Mutation(() => DeleteMetaResponse)
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN, Role.EDITOR)
  async deleteMeta(@Args() deleteMetaArgs: DeleteMetaArgs): Promise<DeleteMetaResponse> {
    const success = await this.metaService.delete(deleteMetaArgs.id);
    return { success };
  }
}
