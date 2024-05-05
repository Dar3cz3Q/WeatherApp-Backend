const express = require('express');
const app = express();

const weatherForecast = require("./routes/forecast/index");
app.use('/forecast', weatherForecast);

app.get('/', (req, res) => {
    res.status(200).send("Hello world!");
});

app.listen(process.env.PORT, () => {
    console.log(`App listening at http://${process.env.IP}:${process.env.PORT} in ${process.env.NODE_ENV} environment...`);
});
