export interface IAuthRequestBody {
  username: string;
  password: string;
}

export interface IAuthTokenStatus {
  status: 'SUCCESS' | 'FAIL';
}
