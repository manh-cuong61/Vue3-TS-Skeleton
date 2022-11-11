import { PERMISSION_CODE } from '@utils/constants';
import {DATE_FORMAT} from '@utils/datetime'
export namespace ApiPayload {
  export interface Login {
    email?: string;
    password?: string;
  }

  export interface ForgotPassword {
    email: string;
  }

  export interface ResetPassword {
    password: string;
    token?: string;
  }

  interface Pagination {
    page: number;
    page_size: number;
  }

  interface Sortable {
    order_by: string;
    order_key: string;
  }

  export interface UserList extends Pagination, Sortable {
    email?: string;
    permission_code?: PERMISSION_CODE;
  }

  export interface NotificationList extends Pagination, Sortable {
    title?: string; 
    start_time?: string;
    end_time?: string;
  }

  export interface NotificationStore {
    title: string;
    message: string;
    is_disabled: boolean;
    delivery_start_at?: string;
    delivery_end_at?: string;
  }
  export interface NotificationUpdate {
    title: string;
    message: string;
    is_disabled: boolean;
    delivery_start_at?: string;
    delivery_end_at?: string;
  }
  export interface UserUpdate {
    email: string;
    permission_code: PERMISSION_CODE;
    password?: string;
  }
}

export namespace ApiResponse {
  export interface Pagination<T> {
    current_page: number;
    total_page: number;
    total: number;
    data: T[];
  }

  interface Timestamp {
    created_at: string;
    updated_at: string;
  }

  export interface Auth {
    access_token: string;
    refresh_token: string;
    expired_time: string;
    refresh_expired_time: string;
  }

  export interface User extends Timestamp {
    admin_id: number;
    email: string;
    family_name: string;
    family_name_kana: string;
    first_name: string;
    first_name_kana: string;
    permission_code: number;
  }

  export interface Notification {
    title: string,
    message: string,
    delivery_start_at: DATE_FORMAT,
    delivery_end_at: DATE_FORMAT,
    is_disabled: number,
    notification_id: number
  }

  export type UserPagination = Pagination<User>;
  export type NotificationPagination = Pagination<Notification>;
}
