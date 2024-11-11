import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize"
import morgan from "morgan";

dotenv.config();

const app: Application = express();

//cors
const allowedOrigin = process.env.CLIENT_URL as string;
const corsOptions = {
    credentials: true,
    origin: [allowedOrigin],
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
};
app.use(cors(corsOptions));

// parse application/json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//security middlewares
app.use(helmet());
app.use(mongoSanitize());

//logger middleware
app.use(morgan("dev"));

//api not found middleware
app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ success: false, message: `${req.originalUrl} - Not Found` });
  });

export default app;