import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EmblueService } from './emblue.service';

@Module({
  providers: [EmblueService],
  imports: [HttpModule],
})
export class EmblueModule {}
