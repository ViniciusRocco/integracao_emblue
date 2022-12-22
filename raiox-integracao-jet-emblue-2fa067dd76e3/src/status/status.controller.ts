import { Controller, Get } from '@nestjs/common';
import configuration from '../config/configuration';
@Controller('status')
export class StatusController {
  @Get()
  public getStatus() {
    return configuration();
  }
}
