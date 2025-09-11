import express, { type Express, type Request, type Response } from "express";
import cors from "cors";

const app: Express = express();

// app.use(cors({
// origin: '*', // your frontend origin
// methods: ['GET','POST','PUT','DELETE'],
// credentials: true
// }));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
