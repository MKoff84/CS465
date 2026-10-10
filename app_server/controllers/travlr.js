// API configuration
const apiOptions = {
    server: 'http://localhost:3000'
};

/* GET travel view */
const travlr = async (req, res) => {
    const url = `${apiOptions.server}/api/trips`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API returned status ${response.status}`);
        }

        const trips = await response.json();

        res.render('travel', {
            title: 'Travlr Getaways',
            trips: trips
        });
    } catch (err) {
        console.error('Error retrieving trips:', err);
        res.status(500).send('Unable to retrieve trip information.');
    }
};

module.exports = {
    travlr
};