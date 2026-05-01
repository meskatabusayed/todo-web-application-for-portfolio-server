import path from 'path';

import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SOLT_ROUNDS!,
  jwt_access_secret: process.env.jwt_access_secret,
};
