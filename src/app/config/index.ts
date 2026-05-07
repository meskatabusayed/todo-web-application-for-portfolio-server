/* eslint-disable prettier/prettier */
import path from 'path';

import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env : process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SOLT_ROUNDS!,
  jwt_access_secret: process.env.jwt_access_secret,
  jwt_refresh_secret: process.env.jwt_refresh_secret,
  jwt_access_expires_in : process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in : process.env.JWT_REFRESH_EXPIRES_IN,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK!,
};

//HARD CHECK
if (!process.env.jwt_access_secret) {
  throw new Error('JWT_ACCESS_SECRET is not defined');
}

if (!process.env.jwt_refresh_secret) {
  throw new Error('JWT_REFRESH_SECRET is not defined');
}