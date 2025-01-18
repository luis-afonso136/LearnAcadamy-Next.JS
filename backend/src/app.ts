import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db"; // Importa o arquivo que inicializa as tabelas

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
