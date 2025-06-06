const express = require("express");
const cors = require('cors');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { port, dbPass, dbUser } = require("./config/keys");
const { clerkMiddleware } = require("@clerk/express")
const termoRoute = require("./routes/termoRoute")
const mongoose = require('mongoose');


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


mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster.mbqiis7.mongodb.net/games?retryWrites=true&w=majority&appName=Cluster`)
.then(() => console.log("Conectado ao MongoDB"))
.catch((err) => console.error("Erro ao conectar ao MongoDB", err));


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
