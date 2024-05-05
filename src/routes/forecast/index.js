const express = require("express");
const router = express.Router();

const axios = require("axios");
axios.defaults.baseURL = 'https://api.open-meteo.com/v1';

const validateData = require("./validate");

router.get('/', validateData, async (req, res) => {
    // Download data from external API
    let responseData = {};
    await axios({
        url: '/forecast',
        params: {
            latitude: req.query.latitude,
            longitude: req.query.longitude,
            daily: "weather_code,temperature_2m_max,temperature_2m_min,daylight_duration",
            timezone: "auto"
        }
    }).then(response => {
        responseData = response.data;
        //console.log(response.data);
    }).catch(error => {
        // TODO: Error handling
        console.log(error.response.status);
        res.status(500).json({ error: "An unexpected problem occurred" });
    });

    // Process the data
    let resultData = [];
    let numberOfDays = Object.keys(responseData.daily.time).length;

    for (let i = 0; i < numberOfDays; i++) {
        let temp = {};
        temp.date = responseData.daily.time[i];
        temp.weather_code = responseData.daily.weather_code[i];
        temp.temp_max = responseData.daily.temperature_2m_max[i];
        temp.temp_min = responseData.daily.temperature_2m_min[i];
        temp.generated_energy = calculateEnergyProduction(responseData.daily.daylight_duration[i]);

        resultData[i] = temp;
    }

    // Send data to user
    res.status(200).json(resultData);
})

function calculateEnergyProduction(timeInSeconds) {
    const panelEfficiency = 0.2;
    const photovoltaicInstallationPower = 2.5;

    let timeInHours = timeInSeconds / 60 / 60;

    return photovoltaicInstallationPower * timeInHours * panelEfficiency;
}

module.exports = router;