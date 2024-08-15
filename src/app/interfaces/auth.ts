export type AuthRequestBody = {
  username: string;
  password: string;
};

export type AuthTokenStatus = {
  status: 'SUCCESS' | 'FAIL';
};
