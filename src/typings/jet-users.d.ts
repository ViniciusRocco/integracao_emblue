export interface User {
  email: string;
  password?: any;
  passwordConfirm?: any;
  salt?: any;
  appIdExternal?: any;
  appNameExternal?: any;
}

export interface Phone {
  phone1: string;
  phone2?: any;
  phoneAdditional?: any;
}

export interface Address {
  idAddress: number;
  streetAddress: string;
  number: string;
  complement?: any;
  neighbourhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  stateProvince?: any;
  addressType: number;
  identification?: any;
  receiver?: any;
  referencePoint?: any;
  commercialResidentialAddress?: any;
  phoneContact: string;
  default: boolean;
  billing: boolean;
  externalId?: any;
}

export interface EmailInfoCategory {
  idEmailInfoCategory: number;
  name: string;
  selected: boolean;
}

export interface Entity {
  idCustomer: number;
  name: string;
  fantasyName?: any;
  typeCustomer: number;
  cpf_cnpj: string;
  rg_ie?: any;
  profession?: any;
  contact?: any;
  gender: number;
  maritalStatus: number;
  url?: any;
  resale: number;
  ip?: any;
  dateBirth: Date;
  status: number;
  user: User;
  phone: Phone;
  address: Address[];
  emailInfoCategory: EmailInfoCategory[];
  automaticSecurePasswordGeneration: boolean;
  email: string;
  externalId?: any;
  dateRegister: Date;
  originOfRegistration?: any;
  metaData: string;
}

export interface JetUser {
  idQueue: number;
  actionType: string;
  entity: Entity;
}
