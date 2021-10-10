/* eslint-disable @typescript-eslint/naming-convention */
export interface Clientes {
  message:  string;
  clientes: ClienteElement[];
}
export interface Cliente {
  message:   string;
  cliente:   ClienteElement[];
  prestamos: Prestamo[];
}

export interface ClienteElement {
  id:                          number;
  name_customer:               string;
  cedula_customer:             number;
  address_work_customer:       string;
  address_home_customer:       string;
  extra_address_customer:      string;
  cellphone_customer:          number;
  extra_cellphone_customer:    number;
  register_status_db_customer: number;
  created_at:                  Date;
  updated_at:                  Date;
}

export interface Prestamo {
  id:                      number;
  fk_id_cliente:           number;
  fk_id_cashorder:         null;
  status_loan:             null;
  amount_loan:             number;
  amount_rest_loan:        number;
  debt_loan:               number;
  date_start_loan:         Date;
  date_pay_loan:           Date;
  interest_rate_loan:      number;
  register_status_db_loan: number;
  created_at:              Date;
  updated_at:              Date;
}
