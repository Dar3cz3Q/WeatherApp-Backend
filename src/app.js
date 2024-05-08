import express from 'express'
import cors from 'cors'
import weatherForecast from './routes/forecast/index.js'

const app = express();

app.use(
    cors({
        optionsSuccessStatus: 200,
        methods: ["GET"],
        credentials: true,
    })
);

// Routes

app.use('/forecast', weatherForecast);

export default app;