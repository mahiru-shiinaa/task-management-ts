import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "@config/database";
import mainV1Routes from "@routes/index.route";
import cors from "cors";




dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Middleware để đọc body từ client, không cần body-parser nâng cao
app.use(express.json()); // Đọc JSON từ client (axios/fetch gửi lên)
app.use(express.urlencoded({ extended: true })); // Nếu dùng form HTML gửi lên

app.use(cors());

mainV1Routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
