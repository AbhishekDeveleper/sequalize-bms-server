import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
export const app = express();
app.options("*", cors());
const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: "Too many request for this IP",
});
app.use(express.json({ limit: "20kb" }));
app.use("/api", limiter);
app.use(morgan('dev'));
app.use((req, res, next) => {
    console.log(`The url is ${req.originalUrl} and the method  of this url is ${req.method}`);
    next();
});
app.get("/home", (req, res) => {
    res.send("Welcome to home Page ...");
});
app.use("*", (req, res, next) => {
    res.send(`The route with this url ${req.originalUrl} is not defined`);
    next();
});
