import { JwtModuleOptions } from "@nestjs/jwt";
require('dotenv').config();


const JWT_CONFIG: JwtModuleOptions = {
  secret: process.env.JWT_KEY,
  signOptions: { expiresIn: process.env.JWT_EXPIRED },
  global: true
}



const MONGO_CONFIG="mongodb+srv://doadmin:dTia270D6JN8W439@db-mongodb-nyc1-32264-f3f62773.mongo.ondigitalocean.com/admin"

export { JWT_CONFIG,MONGO_CONFIG }