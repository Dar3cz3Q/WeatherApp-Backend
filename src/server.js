import app from './app.js'

app.listen(process.env.NODE_PORT, () => {
    console.log(`App listening at http://${process.env.NODE_IP}:${process.env.NODE_PORT} in ${process.env.NODE_ENV} environment...`);
});