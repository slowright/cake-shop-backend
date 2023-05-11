export default () => ({
  port: process.env.PORT,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  access_token: process.env.SECRET_KEY_ACCESS,
  refresh_token: process.env.SECRET_KEY_REFRESH,
  expire_jwt: process.env.EXPIRE_JWT,
  api_url: process.env.API_URL,
});
