import express from 'express'
import cors from 'cors'
import weatherForecast from './routes/forecast/index.js'

const app = express();

app.use(
    cors({
        origin: "" + process.env.APP_PROTOCOL + "://" + process.env.APP_IP + (process.env.NODE_ENV === "development" ? ":" + process.env.APP_PORT + "" : ""),
        optionsSuccessStatus: 200,
        methods: ["GET"],
        credentials: true,
    })
);

// Routes

app.use('/forecast', weatherForecast);

export default app;