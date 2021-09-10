import express, { Application, Request, Response, NextFunction } from "express"
//import "dotenv/config"
import { json } from "body-parser";
import {userRoute} from "./routes/userRoute"
import Connect from "./connect"
const app: Application = express();
app.use(json());

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

const PORT = 3000;//process.env.PORT
const db = "url"
Connect({ db })

app.use(userRoute);

app.all("/*", async (req, res) => {
  console.log(` I am in the mail client service as error ${req.url}`);
  //throw new NotFound();
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`)
})