const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require('cors');


const app = express();

// Habilitar CORS
app.use(cors());


// Limitação de requisições
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
});
app.use(limiter);


// Rotas
// app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
// Inicializar servidor HTTPS
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});