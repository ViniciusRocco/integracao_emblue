import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { delay, lastValueFrom } from 'rxjs';
import { Contato, EmblueSearchRespose } from 'src/typings/emblue';
import { JetUser } from 'src/typings/jet-users';
import { JetOrder } from 'src/typings/order';
import configs from '../config/configuration';

@Injectable()
export class EmblueService {
  constructor(private readonly httpService: HttpService) {}

  private get routes() {
    const {
      emblue: { endpoint, trackEndpoint },
    } = configs();
    return {
      auth: `${endpoint}/Services/Emblue3Service.svc/json/Authenticate`,
      create: `${endpoint}/Services/EmBlue3Service.svc/Json/NewContact`,
      list: `${endpoint}/EmBlue3Service.svc/Json/GetCustomFieldsByEmail`,
      search: `${endpoint}/Services/EmBlue3Service.svc/Json/SearchContact`,
      update: `${endpoint}/Services/EmBlue3Service.svc/Json/EditCustomFieldsOneContact`,
      sendEvent: `${trackEndpoint}/contacts/event`,
    };
  }

  
  public async getUser(emailid: string, token: string) {
    const listResponse = await this.httpService.post<Contato[]>(
      this.routes.list,
      {
        EmailId: emailid,
        Token: token,
      },
    );

    const { status, data } = await lastValueFrom(listResponse);

    if (status !== HttpStatus.OK) {
      return data;
    }

    return [];
  }

  public async search(email: string, token: string) {
    const searchResponse = await this.httpService.post<EmblueSearchRespose[]>(
      this.routes.search,
      {
        Search: email,
        Token: token,
      },
    );

    const { status, data } = await lastValueFrom(searchResponse);

    if (status !== HttpStatus.OK) {
      return [];
    }

    return data;
  }

  private createCustomFieldsinput(customFields: JetOrder): string {
    const customFieldsString = [];

    const {
      idQueue,
      entity: {
        nameCustomer,
        birthDate,
        phone1,
        phone2,
        orderItems,
        totalItens,
        nameStatus,
        dateOrder,
        address: { streetAddress, number, complement, zipCode, city },
      },
    } = customFields;

    if (nameCustomer) {
      if (nameCustomer.includes(' ')) {
        customFieldsString.push(
          `nombre:|:${nameCustomer.split(' ')[0]}:|:1|||`,
        );
        customFieldsString.push(
          `apellido:|:${nameCustomer.split(' ').pop()}:|:1|||`,
        );
      } else {
        customFieldsString.push(`nombre:|:${nameCustomer}:|:1|||`);
      }
    }

    if (streetAddress) {
      customFieldsString.push(
        `direccion:|:${streetAddress} - ${number}, ${complement}, ${zipCode}:|:1|||`,
      );
    }

    if (birthDate) {
      customFieldsString.push(`cumpleanios:|:${birthDate}:|:1|||`);
    }

    if (phone1) {
      customFieldsString.push(`telefono_1:|:${phone1}:|:1|||`);
    }

    if (phone2) {
      customFieldsString.push(`telefono_2:|:${phone2}:|:1|||`);
    }

    if (orderItems.length) {
      const stringItems = orderItems
        .map((item) => `${item.nameProduct} - ${item.idProduct}`)
        .join(' , ');
      customFieldsString.push(`items:|:${stringItems}:|:1|||`);

      const stringCategories = orderItems
        .map((item) => item.category)
        .join(' , ');
      customFieldsString.push(`categoria:|:${stringCategories}:|:1|||`);
    }

    if (totalItens > 0) {
      customFieldsString.push(`monto:|:${totalItens}:|:1|||`);
    }

    if (city) {
      customFieldsString.push(`ciudad:|:${city}:|:1|||`);
    }

    if (nameStatus) {
      customFieldsString.push(`Estado:|:${nameStatus}:|:1|||`);
    }

    if (dateOrder) {
      customFieldsString.push(`datapedido:|:${dateOrder}:|:1|||`);
    }

    if (idQueue) {
      customFieldsString.push(`id_contacto:|:${idQueue}:|:1`);
    }

    const result = customFieldsString.join('');

    return result;
  }

  public async updateUser(
    emailId: string,
    customFields: JetOrder,
    token: string,
  ): Promise<boolean> {
    const updateResponse = await this.httpService.post<{ Result: boolean }>(
      this.routes.update,
      {
        EmailId: emailId,
        Token: token,
        EditedFields: this.createCustomFieldsinput(customFields),
      },
    );

    const { data, status } = await lastValueFrom(updateResponse);

    if (status !== HttpStatus.OK || !data.Result) {
      console.log(
        `Unable to update user: ${customFields.entity.email} in emblue API`,
      );
      return false;
    }

    return true;
  }

  public async createUser(
    email: string,
    customFields: JetOrder,
    token: string,
  ): Promise<void> {
    const users = await this.search(email, token);

    if (users.length) {
      const [user] = users;

      console.log(`Updating User: ${user.Email}`);
      const updated = await this.updateUser(
        String(user.EmailId),
        customFields,
        token,
      );

      if (updated) {
        console.log(`User: ${user.Email} updated at emblue`);
      }

      return;
    }

    const createUserResponse = await this.httpService.post(this.routes.create, {
      Token: token,
      Email: email,
      EditCustomFields: this.createCustomFieldsinput(customFields),
    });

    const { status } = await lastValueFrom(createUserResponse);

    if (status !== HttpStatus.OK) {
      console.log(
        `User: ${email} Cannot be sent to emblue - status: ${status}`,
      );
      return;
    }

    console.log(`User: ${email} was sent to emblue`);
  }

  public async sendEvent(user: JetUser, order: JetOrder): Promise<void> {
    await delay(2000);

    const {
      emblue: { trackAuthToken, eventName },
    } = configs();

    const {
      entity: {
        email,
        phone,
        dateBirth,
        name,
        address: [
          {
            streetAddress,
            neighbourhood,
            number,
            complement,
            city,
            state,
            zipCode,
          },
        ],
      },
    } = user;

    const tel = (phone.phone1 ?? phone.phone2)?.replace(/[^0-9]/g, '');

    const payload = {
      eventName,
      email: email,
      attributes: {
        nombre: name.includes(' ') ? name.split(' ')[0] : name,
        apellido: name,
        direccion: `${streetAddress} ${neighbourhood} N: ${number} - ${complement}, ${city}, ${state} - ${zipCode}`,
        telefono_1: tel.includes('55') ? phone : `55${tel}`,
        items: '',
        categoria: '',
        monto: 0,
        ciudad: city,
        cumpleanios: new Date(dateBirth).toLocaleDateString('pt-BR'),
        datapedido: '',
        fez_pedido: 'nao',
        event_items: [{}],
      },
    };

    if (order) {
      payload.attributes.items = order.entity.orderItems
        .map((item) => item.nameProduct)
        .join(',');
      payload.attributes.categoria = order.entity.orderItems
        .map((item) => item.category)
        .join(',');
      payload.attributes.datapedido = new Date(order.entity.dateOrder)
        .toLocaleDateString('pt-BR')
        .replace(/\//g, '-');
      payload.attributes.fez_pedido = 'sim';
      payload.attributes.monto = order.entity.total;
    }

    const createEventResponse = await this.httpService.post(
      this.routes.sendEvent,
      payload,
      {
        headers: {
          Authorization: trackAuthToken,
        },
      },
    );

    const data = await lastValueFrom(createEventResponse);

    if (data.status !== HttpStatus.OK) {
      console.log(
        `User: ${email} Cannot be sent to emblue - status: ${data.status}`,
      );
      return;
    }

    console.log(`User: ${email} was sent to and emblue`);
  }

  public async auth(): Promise<{ token: string }> {
    const {
      emblue: { password, token, username },
    } = configs();
    const authResponse = await this.httpService.post<{ Token: string }>(
      this.routes.auth,
      {
        User: username,
        Pass: password,
        Token: token,
      },
    );

    const { status, data } = await lastValueFrom(authResponse);

    if (status !== HttpStatus.OK) {
      return {
        token: null,
      };
    }

    return {
      token: data.Token,
    };
  }
}
