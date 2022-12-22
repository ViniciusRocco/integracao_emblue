# Update of users in the database: Emblue

basically this api queries the orders that were made on the platform: https://jetecommerce.com.br and creates/updates user data on the Emble platform: https://www.embluemail.com/pt/

### [NPM](https://github.com/nvm-sh/nvm)
```
nvm use >= 16
```
### Run project
```
yarn
```
or
```
npm i
```
### Envs

| name                | description                                                                         | value                                        |
|---------------------|-------------------------------------------------------------------------------------|----------------------------------------------|
| JET_ENDPOINT        | Endpoint for querying information on Jet                                            | https://adm-pedido-neo1.plataformaneo.com.br |
| JET_USERNAME        | User to login to the Jet API                                                        | *********                                    |
| JET_PASSWORD        | Password to login to the Jet platform                                               | *********                                    |
| JET_STORE_ID        | Store ID for login to the Jet platform                                              | *********                                    |
| JET_INTEGRATION_KEY | JET platform integration key                                                        | *********                                    |
| EMBLUE_TOKEN        | Token Emblue                                                                        | *********                                    |
| EMBLUE_USERNAME     | Username emblue                                                                     | *********                                    |
| EMBLUE_PASSWORD     | Password Emblue                                                                     | *********                                    |
| CRON_SERVICE        | Configures how long the user update should run                                      | 0 */2 * * *                                  |
| PORT                | Port where the application should run                                               | 3000                                         |
| IS_LOCAL            | Defines if the API will run locally, that is, it will use fake data to make updates | false                                        |
| TIMEOUT_API         | How long will you wait to query emblue APIs                                         | 2500 (two and a half seconds)                |

### Local

To test locally, simply set the ENV `IS LOCAL` value to a true value.

Once this is done, you can change the values ​​inside the fake JSON at: `./src/mock/order.ts`


### Mock example:

Below you can find an example of the return of the JET order API.

``` ts
export const order = {
  idQueue: 3631859,
  actionType: 'I',
  entity: {
    expirationDate: null,
    paymentDate: null,
    paymentFormId: null,
    paymentFormDescription: 'Checkout Transparente',
    idShipping: 11167,
    idShippingHub: 2,
    shippingCompany: 'MANDAE RAPIDO',
    shippingMode: '',
    shippingRegister: '',
    typeCustomer: 'F',
    birthDate: '1992-09-28T00:00:00',
    gender: 'F',
    phone1: '(11) 98057-5942',
    phone2: '',
    group: 'PayPal',
    b2bB2c: 0,
    externalId: null,
    idPaymentType: '',
    idAdminCard: '',
    cardAuthorizationCode: null,
    cardNsu: null,
    orderNotes: 'Desconto Demanda: Id - 48763 Nome - LUMA15',
    marketPlaceNumberOrder: '',
    marketPlaceID: 0,
    marketPlaceName: '',
    marketPlaceDateCreated: null,
    marketPlaceStore: '',
    idSeller: null,
    crossDocking: 4,
    billNumber: null,
    proofOfSale: null,
    originApp: false,
    orderZapcommerce: {
      idOrderZap: null,
      nameSeller: null,
      idSeller: 0,
      emailSeller: null,
    },
    orderCD: null,
    idCustomer: 3439748,
    totalShipping: 10.37,
    totalDiscount: 16.02,
    address: {
      idAddress: 21381026,
      streetAddress: 'RUA COIMBRA',
      number: '620',
      complement: 'BLOCO 2 APTO 74 ',
      neighbourhood: 'CENTRO',
      city: 'DIADEMA',
      state: 'SP',
      zipCode: '09910-120 ',
      country: null,
      stateProvince: null,
      addressType: 0,
      identification: null,
      receiver: 'HELLEN S BOTTOS',
      referencePoint: null,
      commercialResidentialAddress: null,
      phoneContact: null,
      default: false,
      billing: false,
      externalId: '',
    },
    billingAddress: {
      idAddress: 21381026,
      streetAddress: 'RUA COIMBRA',
      number: '620',
      complement: 'BLOCO 2 APTO 74 ',
      neighbourhood: 'CENTRO',
      city: 'DIADEMA',
      state: 'SP',
      zipCode: '09910-120 ',
      country: null,
      stateProvince: null,
      addressType: 0,
      identification: null,
      receiver: null,
      referencePoint: null,
      commercialResidentialAddress: null,
      phoneContact: null,
      default: false,
      billing: false,
      externalId: '',
    },
    email: 'hellensantama1@hotmail.com',
    idPaymentBrand: 311,
    codeBank: null,
    nameBank: '',
    agency: '',
    checkingAccount: '',
    creditCardFlag: 'PayPal',
    numberOfInstallments: 3,
    valueOfInstallment: 33.71,
    orderItems: [
      {
        idOrderItem: 4821192,
        idProduct: 4746360,
        productCode: '21001001',
        idSku: 0,
        name: '<h1>Shampoo para Brilhar 320ml</h1>',
        total: 52.9,
        quantity: 1,
        unitPrice: 52.9,
        deliveryTime: null,
        image:
          '//static.up2youcosmetics.com/produto/20210924090802_5103994897_D.jpg',
        brand: null,
        category: 'CABELO',
        externalIdProduct: '383585547',
        externalIdSku: null,
        isKit: false,
        productsKit: null,
        skuCode: null,
        crossDocking: 4,
        attribute: [],
        nameProduct: 'Shampoo para Brilhar 320ml',
        orderItemVariations: null,
        personalizations: null,
        idOrderItemPersonalization: null,
        personalizationString: null,
      },
      {
        idOrderItem: 4821193,
        idProduct: 4746432,
        productCode: '21002001',
        idSku: 0,
        name: '<h1>Condicionador para Brilhar 320ml</h1>',
        total: 53.9,
        quantity: 1,
        unitPrice: 53.9,
        deliveryTime: null,
        image:
          '//static.up2youcosmetics.com/produto/20210924100955_3820996180_D.jpg',
        brand: null,
        category: 'CABELO',
        externalIdProduct: '383580801',
        externalIdSku: null,
        isKit: false,
        productsKit: null,
        skuCode: null,
        crossDocking: 4,
        attribute: [],
        nameProduct: 'Condicionador para Brilhar 320ml',
        orderItemVariations: null,
        personalizations: null,
        idOrderItemPersonalization: null,
        personalizationString: null,
      },
    ],
    nameCustomer: 'Erislandio Soares',
    cpf_cnpj: '40831014822',
    rg_ie: '',
    nameShipping: 'MANDAE RAPIDO',
    deliveryShipping: null,
    totalItens: 106.8,
    totalInstallment: 101.15,
    historyListOrderStatus: [
      {
        idOrderStatus: 7878,
        statusCode: '01',
        statusName: 'Novo',
        dateRegisterStatus: '2021-07-27T17:11:55.643',
        message: 'OK',
        icon: 'certificate',
        sendEmail: false,
        orderInfo: {
          idOrderInfo: 0,
          key: null,
          dateIssuance: null,
          methodShipping: null,
          noteNumber: null,
          trackingNumber: null,
          shipping: null,
        },
        trackingLink: null,
      },
      {
        idOrderStatus: 7880,
        statusCode: '03',
        statusName: 'Aprovado',
        dateRegisterStatus: '2021-07-27T17:12:00.267',
        message: 'Aprovado',
        icon: 'thumbs up',
        sendEmail: false,
        orderInfo: {
          idOrderInfo: 0,
          key: null,
          dateIssuance: null,
          methodShipping: null,
          noteNumber: null,
          trackingNumber: null,
          shipping: null,
        },
        trackingLink: null,
      },
      {
        idOrderStatus: 7881,
        statusCode: '04',
        statusName: 'Despachado',
        dateRegisterStatus: '2021-08-31T17:11:29.813',
        message: '',
        icon: 'cubes',
        sendEmail: false,
        orderInfo: {
          idOrderInfo: 0,
          key: null,
          dateIssuance: null,
          methodShipping: null,
          noteNumber: '098584',
          trackingNumber: null,
          shipping: 'MANDAÊ SERVICOS DE CONSULTORIA EM LOGISTICA S/A',
        },
        trackingLink: null,
      },
    ],
    customerExternalId: null,
    paymentLink: null,
    metaData: '',
    totalShoppingVoucher: 0,
    idTypePayment: 0,
    orderPayment: {
      dateRegister: '2021-07-27T17:11:55.633',
      linkPayment: '',
      idPaymentGateway: 16,
      paymentCode: 'PayPal',
      transactionCode: '',
      transactionStatus: '',
      tid: '',
      nsu: '',
      brand: 'PayPal',
      idPreOrder: 2015182,
      multiCards: null,
    },
    codigoExternoFrete: 'MANDAE RAPIDO',
    deliveryTime: 5,
    usefulDay: null,
    nameCarrying: null,
    trackingLink: null,
    recurrentCodePlan: null,
    recurrentSelectedTime: null,
    interestValue: 0,
    descricaoDetalhada: null,
    idOrder: 1552414,
    dateOrder: '2021-07-27T17:11:55.633',
    total: 101.15,
    namePaymentMethodGateway: 'PayPal - Checkout Transparente',
    nameStatus: 'Despachado',
    orderType: 0,
  },
};

```