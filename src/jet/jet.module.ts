import { Module } from '@nestjs/common';
import { JetService } from './jet.service';
import { JetController } from './jet.controller';
import { HttpModule } from '@nestjs/axios';
import { EmblueService } from '../emblue/emblue.service';

@Module({
  providers: [JetService, EmblueService],
  controllers: [JetController],
  imports: [HttpModule],
})
export class JetModule {}
