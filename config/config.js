const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  require('dotenv').config();
}
console.log(`Server is running in ${env} mode!`);
