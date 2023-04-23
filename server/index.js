require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
});

app.post("/create", (req, res) => {
  const material = req.body.material;
  const quantidade = req.body.quantidade;

  db.query(
    "INSERT INTO materiais (material, quantidade) VALUES (?,?)",
    [material, quantidade],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Dados cadastrados com sucesso!");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
