require('dotenv').config();

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: "postgres"
}
// AWS RDS requer que as conexões sejam feitas com o SSL ativo,
// o que não é comum no ambiente de desenvolvimento

if (process.env.NODE_ENV == 'production') {
    config["dialectOptions"] = {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
   // config["logging"] = false
}

module.exports = config