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

app.post("/cadastrar", (req, res) => {
  const tecido = req.body.tecido;
  const quantidade = req.body.quantidade;

  db.query(
    "INSERT INTO tecidos (tecido, quantidade) VALUES (?,?)",
    [tecido, quantidade],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Dados cadastrados com sucesso!");
      }
    }
  );
});

app.get("/tecidos", (req, res) => {
  db.query("SELECT * FROM tecidos", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/atualizar", (req, res) => {
  const id = req.body.id;
  const quantidade = req.body.quantidade;
  db.query(
    "UPDATE tecidos SET quantidade = ? WHERE id = ?",
    [quantidade, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/excluir/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM tecidos WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
