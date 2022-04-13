const express = require('express');
const app = express();
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const cors = require('cors');
const routes= require('./routes')

const PORT = process.env.PORT;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//cors
app.use(cors());

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// serviço health check
app.get("/", (req, res) => {
  return res.status(200).json({ message: "ok :P " })
});

//rotas
app.use(routes)

// Inicia o serviço
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}! ;)`);
});