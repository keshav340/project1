import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaEntity } from './entity/meta.entity';

@Injectable()
export class MetaService {
  constructor(
    @InjectRepository(MetaEntity)
    private metaRepository: Repository<MetaEntity>,
  ) {}

  async findAll(): Promise<MetaEntity[]> {
    return this.metaRepository.find();
  }

  async findById(id: number): Promise<MetaEntity> {
    return this.metaRepository.findOne({ where: { id } });
  }

  async create(metaTitle: string, metaDescription?: string): Promise<MetaEntity> {
    const meta = this.metaRepository.create({ metaTitle, metaDescription });
    return this.metaRepository.save(meta);
  }

  async update(id: number, metaTitle: string, metaDescription?: string): Promise<MetaEntity> {
    const meta = await this.metaRepository.findOne({ where: { id } });
    if (!meta) {
      throw new Error('Meta not found');
    }

    meta.metaTitle = metaTitle;
    meta.metaDescription = metaDescription;
    return this.metaRepository.save(meta);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.metaRepository.delete(id);
    return result.affected > 0;
  }
}
