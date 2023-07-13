import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  async getAllTags(): Promise<TagEntity[]> {
    return this.tagRepository.find();
  }

  async createTag(name: string): Promise<TagEntity> {
    const tag = this.tagRepository.create({ name });
    return this.tagRepository.save(tag);
  }

  async updateTag(id: number, name: string): Promise<TagEntity> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new Error('Tag not found');
    }

    tag.name = name;
    return this.tagRepository.save(tag);
  }

  async deleteTag(id: number): Promise<void> {
    await this.tagRepository.delete(id);
  }
}
