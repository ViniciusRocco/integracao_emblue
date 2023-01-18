import {
  Catch,
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { jetUser } from '../mock/user';
import configuration from '../config/configuration';
import { EmblueService } from '../emblue/emblue.service';
import { order } from '../mock/order';
import { JetService } from './jet.service';

@Controller('jet')
@Catch(HttpException)
export class JetController {
  constructor(
    private readonly jetService: JetService,
    private readonly emblueService: EmblueService,
  ) {}

  @Get('configs')
  public async configs() {
    return configuration();
  }

  private async run() {
    const { data: auth } = await this.jetService.auth();
    console.log(auth);
    const { timeoutapi } = configuration();

    if (!auth.access_token) {
      return new HttpException(
        'access_token inválido, verificar o metodo: JetService.auth',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const users = configuration().isLocal
      ? [jetUser]
      : await this.jetService.getUsers(auth.access_token);

    if (!users.length) {
      return {
        message: 'There are no users to be sent to emblue',
        users: [],
      };
    }

    const orders = configuration().isLocal
      ? [order]
      : await this.jetService.findAllOrders(auth.access_token);

    if (!order || !orders.length) {
      console.log('There are no orders on Jet api');
    }

    users.forEach(async (user, index) => {
      setTimeout(() => {
        const userOrder = ((orders as any) ?? []).find(
          (order) => order.entity.email === user.entity.email,
        );
        this.emblueService.sendEvent(user, userOrder);
      }, index * timeoutapi);
    });
  }

  @Get('manually')
  @Cron(CronExpression.EVERY_5_MINUTES)
  public async getOrders() {
    try {
      this.run();
      return {
        mesage: 'Service running in the background',
      };
    } catch (error) {
      return error;
    }
  }
}
