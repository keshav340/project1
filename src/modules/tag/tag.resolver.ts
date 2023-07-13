import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { CreateTagArgs, UpdateTagArgs, DeleteTagArgs } from './args/args';
import { Tag, CreateTagResponse, UpdateTagResponse, DeleteTagResponse } from './schema/schema';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    return this.tagService.getAllTags();
  }

  @Mutation(() => CreateTagResponse)
  async createTag(@Args('name') name: string): Promise<CreateTagResponse> {
    const tag = await this.tagService.createTag(name);
    return { tag };
  }

  @Mutation(() => UpdateTagResponse)
  async updateTag(@Args() args: UpdateTagArgs): Promise<UpdateTagResponse> {
    const tag = await this.tagService.updateTag(args.id, args.name);
    return { tag };
  }

  @Mutation(() => DeleteTagResponse)
  async deleteTag(@Args() args: DeleteTagArgs): Promise<DeleteTagResponse> {
    await this.tagService.deleteTag(args.id);
    return { success: true };
  }
}
