import { HttpContext, HttpContextToken } from '@angular/common/http';

export const TOKEN_KEY = 'token-info';
export const USER_KEY = 'user-info';
export const PASSWORD_RESET_IDENTIFIER = 'reset-password-identifier';
export const SHOW_HTTP_LOADER = new HttpContextToken<boolean>(() => false);
export const NOTIFICATIONS_KEY = 'notifications';
