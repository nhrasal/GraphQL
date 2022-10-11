export type Token = {
  token: string;
  exp: string;
};

export type TokenGeneratorPayload = {
  id: string;
  email: string;
};

export type TokenPayloadReturn = {
  userId: string;
  email: string;
  shopifyUserId?: string;
  shopifyAccessToken?: string;
  iat: string;
  exp: string;
};
