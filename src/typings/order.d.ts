export interface OrderZapcommerce {
  idOrderZap?: any;
  nameSeller?: any;
  idSeller: number;
  emailSeller?: any;
}

export interface Address {
  idAddress: number;
  streetAddress: string;
  number: string;
  complement: string;
  neighbourhood: string;
  city: string;
  state: string;
  zipCode: string;
  country?: any;
  stateProvince?: any;
  addressType: number;
  identification?: any;
  receiver: string;
  referencePoint?: any;
  commercialResidentialAddress?: any;
  phoneContact?: any;
  default: boolean;
  billing: boolean;
  externalId: string;
}

export interface BillingAddress {
  idAddress: number;
  streetAddress: string;
  number: string;
  complement: string;
  neighbourhood: string;
  city: string;
  state: string;
  zipCode: string;
  country?: any;
  stateProvince?: any;
  addressType: number;
  identification?: any;
  receiver?: any;
  referencePoint?: any;
  commercialResidentialAddress?: any;
  phoneContact?: any;
  default: boolean;
  billing: boolean;
  externalId: string;
}

export interface OrderItem {
  idOrderItem: number;
  idProduct: number;
  productCode: string;
  idSku: number;
  name: string;
  total: number;
  quantity: number;
  unitPrice: number;
  deliveryTime?: any;
  image: string;
  brand?: any;
  category: string;
  externalIdProduct: string;
  externalIdSku?: any;
  isKit: boolean;
  productsKit?: any;
  skuCode?: any;
  crossDocking: number;
  attribute: any[];
  nameProduct: string;
  orderItemVariations?: any;
  personalizations?: any;
  idOrderItemPersonalization?: any;
  personalizationString?: any;
}

export interface OrderInfo {
  idOrderInfo: number;
  key?: any;
  dateIssuance?: any;
  methodShipping?: any;
  noteNumber: string;
  trackingNumber?: any;
  shipping: string;
}

export interface HistoryListOrderStatu {
  idOrderStatus: number;
  statusCode: string;
  statusName: string;
  dateRegisterStatus: Date;
  message: string;
  icon: string;
  sendEmail: boolean;
  orderInfo: OrderInfo;
  trackingLink?: any;
}

export interface OrderPayment {
  dateRegister: Date;
  linkPayment: string;
  idPaymentGateway: number;
  paymentCode: string;
  transactionCode: string;
  transactionStatus: string;
  tid: string;
  nsu: string;
  brand: string;
  idPreOrder: number;
  multiCards?: any;
}

export interface Entity {
  expirationDate?: any;
  paymentDate?: any;
  paymentFormId?: any;
  paymentFormDescription: string;
  idShipping: number;
  idShippingHub: number;
  shippingCompany: string;
  shippingMode: string;
  shippingRegister: string;
  typeCustomer: string;
  birthDate: Date;
  gender: string;
  phone1: string;
  phone2: string;
  group: string;
  b2bB2c: number;
  externalId?: any;
  idPaymentType: string;
  idAdminCard: string;
  cardAuthorizationCode?: any;
  cardNsu?: any;
  orderNotes: string;
  marketPlaceNumberOrder: string;
  marketPlaceID: number;
  marketPlaceName: string;
  marketPlaceDateCreated?: any;
  marketPlaceStore: string;
  idSeller?: any;
  crossDocking: number;
  billNumber?: any;
  proofOfSale?: any;
  originApp: boolean;
  orderZapcommerce: OrderZapcommerce;
  orderCD?: any;
  idCustomer: number;
  totalShipping: number;
  totalDiscount: number;
  address: Address;
  billingAddress: BillingAddress;
  email: string;
  idPaymentBrand: number;
  codeBank?: any;
  nameBank: string;
  agency: string;
  checkingAccount: string;
  creditCardFlag: string;
  numberOfInstallments: number;
  valueOfInstallment: number;
  orderItems: OrderItem[];
  nameCustomer: string;
  cpf_cnpj: string;
  rg_ie: string;
  nameShipping: string;
  deliveryShipping?: any;
  totalItens: number;
  totalInstallment: number;
  historyListOrderStatus: HistoryListOrderStatu[];
  customerExternalId?: any;
  paymentLink?: any;
  metaData: string;
  totalShoppingVoucher: number;
  idTypePayment: number;
  orderPayment: OrderPayment;
  codigoExternoFrete: string;
  deliveryTime: number;
  usefulDay?: any;
  nameCarrying?: any;
  trackingLink?: any;
  recurrentCodePlan?: any;
  recurrentSelectedTime?: any;
  interestValue: number;
  descricaoDetalhada?: any;
  idOrder: number;
  dateOrder: Date;
  total: number;
  namePaymentMethodGateway: string;
  nameStatus: string;
  orderType: number;
}

export interface JetOrder {
  idQueue: number;
  actionType: string;
  entity: Entity;
}
