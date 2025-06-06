const express = require("express");
const cors = require('cors');
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const { port } = require("./config/keys");
const { clerkMiddleware } = require("@clerk/express")

const app = express();

// Habilitar CORS
app.use(cors());

// Middlewares de segurança
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(express.urlencoded({ extended: true }));


// Limitação de requisições
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
});
app.use(limiter);


// Middleware para proteger rotas
app.use(clerkMiddleware())


// Inicializar servidor HTTPS
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});