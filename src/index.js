const express = require('express');
const app = express();
const cors = require("cors");

app.use(
    cors({
        origin: ["http://" + process.env.APP_IP + ":" + process.env.APP_PORT + ""],
        optionsSuccessStatus: 200,
        methods: ["GET"],
        credentials: true,
    })
);

const weatherForecast = require("./routes/forecast/index");
app.use('/forecast', weatherForecast);

app.get('/', (req, res) => {
    res.status(200).send("Hello world!");
});

app.listen(process.env.NODE_PORT, () => {
    console.log(`App listening at http://${process.env.NODE_IP}:${process.env.NODE_PORT} in ${process.env.NODE_ENV} environment...`);
});
