// Simple little interface for grabbing a random page from google image search
var GoogleImage = {
    /**
     * get()
     * Gets a semi-random page of images from Google Image search
     * returns a Promise representing the completed search
     */
    get: function (searchTerm) {
        const googleImages = require('google-images');

        let client = googleImages(
            '010972739567059593472:4vdlxaechz8',        // My Google CSE Key
            'AIzaSyDxC6zwHg8YAQLUgnL29RK0U84WU7o223g'   // My Google API Key
        );

        return client.search(searchTerm, {
            size: 'large',
            page: Math.floor(Math.random() * 100)
        });
    }
};

module.exports = GoogleImage;
