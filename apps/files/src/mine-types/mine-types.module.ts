import { Module } from '@nestjs/common';
import { MineTypesService } from './services/mine-types.service';

@Module({
  providers: [MineTypesService],
  exports: [MineTypesService],
})
export class MineTypesModule {}
