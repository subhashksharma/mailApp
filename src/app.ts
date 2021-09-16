import express, { Application, Request, Response, NextFunction } from "express"
//import "dotenv/config"
import dotenv from 'dotenv';
dotenv.config();

import { json } from "body-parser";
import Connect from "./connect"
import { mailRoute } from "./routes/mailRoute";

const app: Application = express();
app.use(json());

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.port;
const db = process.env.dbUrl!;
Connect({ db })

app.use(mailRoute);

app.all("/*", async (req, res) => {
  console.log(` I am in the mail client service as error ${req.url}`);
  //throw new NotFound();
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`)
})