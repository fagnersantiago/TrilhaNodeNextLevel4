import "reflect-metadata";
import express from "express";
import CreateConnection from "./database";
import router from "./routes";

CreateConnection();
const app = express();

app.use(express.json());
app.use(router);

export default app;
