require('dotenv').config();

const ENV_VARIABLES =  ["PORT", "NODE_ENV", "MONGO_URI", "CORS_ORIGINS"];

// Check if all required variables in .env file are set.
ENV_VARIABLES.forEach(VAR => {
  if(!process.env[VAR]) {
    throw new Error(`${VAR} is not set in .env file`);
  }

})

const { 
  JWT_SECRET
} = process.env;

const MIN_SECRET_LENGTH = 64;

if(JWT_SECRET.length < MIN_SECRET_LENGTH) {
  throw new Error("Secret's length is short");
}


