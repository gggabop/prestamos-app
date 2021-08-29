/* eslint-disable @typescript-eslint/naming-convention */
export interface auth {
  errors?: [];
  message: string;
  user?: {
       name: string;
       email: string;
       level: string;
    };
    access_token?: string;
}

export interface Usuario {
  name: string;
  email: string;
  level: string;
}
