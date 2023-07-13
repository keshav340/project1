import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MetaService } from './meta.service';
import { Meta, CreateMetaResponse, UpdateMetaResponse, DeleteMetaResponse } from 'src/modules/meta/schema/schema';
import { CreateMetaArgs, UpdateMetaArgs, DeleteMetaArgs } from 'src/modules/meta/args/args';

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
  async createMeta(@Args() { metaTitle, metaDescription }: CreateMetaArgs): Promise<CreateMetaResponse> {
    const meta = await this.metaService.create(metaTitle, metaDescription);
    return { meta };
  }
  

  @Mutation(() => UpdateMetaResponse)
  async updateMeta(@Args() { id, metaTitle, metaDescription }: UpdateMetaArgs): Promise<UpdateMetaResponse> {
    const meta = await this.metaService.update(id, metaTitle, metaDescription);
    return { meta };
  }

  @Mutation(() => DeleteMetaResponse)
  async deleteMeta(@Args() deleteMetaArgs: DeleteMetaArgs): Promise<DeleteMetaResponse> {
    const success = await this.metaService.delete(deleteMetaArgs.id);
    return { success };
  }
}
