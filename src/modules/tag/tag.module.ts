import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  providers: [TagService, TagResolver],
})
export class TagModule {}
