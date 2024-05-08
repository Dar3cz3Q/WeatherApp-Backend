import express from 'express'
import axios from 'axios'
import validateData from './validate.js'

const router = express.Router();
axios.defaults.baseURL = 'https://api.open-meteo.com/v1';

router.get('/', validateData, async (req, res) => {
    // Download data from external API
    try {
        let responseData = await axios({
            url: '/forecast',
            params: {
                latitude: req.query.latitude,
                longitude: req.query.longitude,
                daily: "weather_code,temperature_2m_max,temperature_2m_min,sunshine_duration",
                timezone: "auto"
            }
        });

        let dailyData = responseData.data.daily;

        // Process the data
        let resultData = [];
        let numberOfDays = Object.keys(dailyData.time).length;

        for (let i = 0; i < numberOfDays; i++) {
            let temp = {};
            temp.date = dailyData.time[i];
            temp.weather_code = dailyData.weather_code[i];
            temp.temp_max = dailyData.temperature_2m_max[i];
            temp.temp_min = dailyData.temperature_2m_min[i];
            temp.generated_energy = calculateEnergyProduction(dailyData.sunshine_duration[i]);

            resultData[i] = temp;
        }

        // Send data to user
        return res.status(200).json(resultData);
    } catch (error) {
        console.log(error);

        if (error.response) {
            // Server responded with an error
            return res.status(error.response.status).json({ error: error.response.data.reason });
        } else if (error.request) {
            // No response from server
            return res.status(500).json({ error: "Internal server error" });
        } else {
            // Error while setting up the request
            return res.status(501).json({ error: "Application error" });
        }
    }
})

function calculateEnergyProduction(timeInSeconds) {
    const panelEfficiency = 0.2;
    const photovoltaicInstallationPower = 2.5;

    let timeInHours = timeInSeconds / 60 / 60;

    return photovoltaicInstallationPower * timeInHours * panelEfficiency;
}

export default router;