function validateData(req, res, next) {
    const minLatitude = -90;
    const maxLatitude = 90;
    const minLongitude = -180;
    const maxLongitude = 180;

    let latitude = Number(req.query.latitude);
    let longitude = Number(req.query.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Latitude and longitude must be a number" });
    }

    let errors = {};

    if (latitude > maxLatitude || latitude < minLatitude) {
        errors.latitude = "Latitude must be between " + minLatitude + " and " + maxLatitude + "";
    }

    if (longitude > maxLongitude || longitude < minLongitude) {
        errors.longitude = "Longitude must be between " + minLongitude + " and " + maxLongitude + "";
    }

    if (Object.keys(errors).length != 0) {
        return res.status(400).send(errors);
    }

    next();
}

module.exports = validateData;