const express = require("express");
const cors = require('cors');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { port } = require("./config/keys");
const { clerkMiddleware } = require("@clerk/express")
const termoRoute = require("./routes/termoRoute")

const app = express();

app.use(cors());

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
});
app.use(limiter);


app.use(clerkMiddleware())

app.use("/termo", termoRoute);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});