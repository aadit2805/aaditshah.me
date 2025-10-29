import { SignJWT, jwtVerify } from 'jose';

const getSecretKey = () => {
  const secret = process.env.AUTH_SECRET || 'dev-secret-key-change-me-please-1234567890';
  return new TextEncoder().encode(secret);
};

export async function signAdminJwt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey());
}

export async function verifyAdminJwt(token) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch (err) {
    return null;
  }
}
