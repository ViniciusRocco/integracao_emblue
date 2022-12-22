export interface Contato {
  id: string;
  nombre: string;
  valor: string;
  tipoCampo: string;
  tipoDato: string;
  tipoOpcion: string;
  valores: any;
  esFijoEmblue: boolean;
  numero: string;
  cantidadContactos: number;
  solo_lectura: boolean;
  integracion_id: any;
}

export interface EmblueSearchRespose {
  Email: string;
  EmailId: number;
}
