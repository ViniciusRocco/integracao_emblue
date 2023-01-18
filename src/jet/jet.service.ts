import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { JetOrder } from '../typings/order';
import configs from '../config/configuration';
import { AuthResponse } from '../typings/jet';
import { JetUser } from 'src/typings/jet-users';

@Injectable()
export class JetService {
  constructor(private readonly httpService: HttpService) {}

  private get routes() {
    const {
      jet: { endpoint, integrationKey },
    } = configs();

    return {
      orders: `${endpoint}/api/v1/adm_order/GetQueue?integrationKey=${integrationKey}`,
      auth: `${endpoint}/api/v1/auth`,
      users: `${endpoint}/api/v1/adm_customer/GetQueue?integrationKey=${integrationKey}`,
    };
  }

  public async auth() {
    console.log("teste1")
    try {
      const {
        jet: { password, username, storeID },
      } = configs();

      const authRespose = await this.httpService.post<AuthResponse>(
        this.routes.auth,
        {
          username,
          password,
          storeID,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return await lastValueFrom(authRespose);
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  public async getUsers(accessToken: string): Promise<JetUser[]> {
    try {
      const response = await this.httpService.get<JetUser[]>(
        this.routes.users,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const { data, status } = await lastValueFrom(response);

      if (status !== HttpStatus.OK) {
        console.log(
          `It was not possible to consult the orders in the jetshop API - status: ${status}`,
        );

        return [];
      }

      return data;
    } catch (error) {
      console.log(error);

      return [];
    }
  }

  public async findAllOrders(accessToken: string): Promise<JetOrder[]> {
    try {
      const response = this.httpService.get<JetOrder[]>(this.routes.orders, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { data: orders, status } = await lastValueFrom(response);

      if (status !== HttpStatus.OK) {
        console.log(
          `It was not possible to consult the orders in the jetshop API - status: ${status}`,
        );

        return [];
      }

      return orders;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
