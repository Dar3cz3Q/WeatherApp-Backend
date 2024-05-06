const minLatitude = -90;
const maxLatitude = 90;
const minLongitude = -180;
const maxLongitude = 180;

function validateData(req, res, next) {
    // Check if parameters are provided
    if (!req.query.latitude)
        return res.status(400).json({ error: "No latitude provided" });
    if (!req.query.longitude)
        return res.status(400).json({ error: "No longitude provided" });

    // Check if parameters are numbers
    let latitude = Number(req.query.latitude);
    let longitude = Number(req.query.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Latitude and longitude must be a number" });
    }

    // Check if parameters are in between min, max values
    if (latitude > maxLatitude || latitude < minLatitude) {
        return res.status(400).json({ error: "Latitude must be between " + minLatitude + " and " + maxLatitude + "" });
    }

    if (longitude > maxLongitude || longitude < minLongitude) {
        return res.status(400).json({ error: "Longitude must be between " + minLongitude + " and " + maxLongitude + "" });
    }

    next();
}

module.exports = validateData;