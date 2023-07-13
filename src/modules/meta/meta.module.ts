import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaEntity } from './entity/meta.entity';
import { MetaResolver } from './meta.resolver';
import { MetaService } from './meta.service';
@Module({
  imports: [TypeOrmModule.forFeature([MetaEntity])],
  providers: [MetaResolver, MetaService],
})
export class MetaModule {}
