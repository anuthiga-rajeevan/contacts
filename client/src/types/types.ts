export enum LoadingStatus {
  idle = 'idle',
  loading = 'loading',
  success = 'success',
  failed = 'failed',
}

export type User = {
  name: string | null;
  email: string | null;
  token: string | null;
};

export interface IRegisterUserData {
  name: String;
  email: String;
  password: String;
  repeatPassword: String;
}

export interface ILoginUserData {
  email: String;
  password: String;
}

export interface PhoneNo {
  type: String;
  phoneNo: String;
  isPrimary: boolean;
}

export interface Email {
  type: String;
  email: String;
  isPrimary: boolean;
}

export interface ImportantDates {
  type: String;
  date: number;
}
export interface ContactResponse {
  _id: String;
  user_id: String;
  firstName: String;
  lastName: String;
  phone: PhoneNo[];
  email: Email[];
  importantDates: ImportantDates[];
}

export interface FilteredContact {
  _id: String;
  user_id: String;
  firstName: String;
  lastName: String;
  phoneNo: String;
  emailAddress: String;
}
