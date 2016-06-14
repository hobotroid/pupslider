var GoogleImage = require(__dirname + "/src/js/images/GoogleImage.js");

var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// Biews is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

/**
 * Setup API and its routes!
 * As it stands, this API runs in the same process that serves the game files
 * to the client. This is obviously not an ideal way to do it and if this were
 * a real production app, these two things would be separate projects.
 */
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * /api/pups GET
 * gets a page of puppy image urls
 */
router.route('/pups')
    .get(function(req, res) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');

        // If our google search times out/fails for whatever reason, use a 
        // static list
        res.setTimeout(5000, function(){
            var shuffle = require('shuffle-array');
            var cachedPuppiesJson = JSON.parse(fs.readFileSync('staticpups.json', 'utf8'));
            var cachedUrls = shuffle(cachedPuppiesJson.urls);

            console.log("Google request timed out. Using static list.");

            res.json({ message: cachedUrls });
            res.end();
        });

        let searchPromise = GoogleImage.get("cute puppy");
        searchPromise.then(function (images) {
            console.log("Using Google results!");
            let urls = images.map(image => {
                return image.url;
            });
            res.json({ message: urls });
        });
    });

/**
 * Scores GET and POST
 * For now, scores are stored in a simple JSON file. They're presented in
 * two lists - one sorted by time and one sorted by # of moves
 */
function getScoresFromFile() {
    try {
        var scoresJson = JSON.parse(fs.readFileSync('scores.json', 'utf8'));
    } catch(e) {
        var scoresJson = {byTime: [], byMoves: []};
    }

    return scoresJson;
}
router.route('/scores')
    .get(function(req, res) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');

        res.json(getScoresFromFile());
    })

    .post(function(req, res) {
        var name = req.body.name;
        var time = req.body.time;
        var moves = req.body.moves;

        var scoresJson = getScoresFromFile();

        // Add new entry to score lists and then sort them and trim
        scoresJson.byTime.push({ name: name, time: time});
        scoresJson.byMoves.push({ name: name, moves: moves });
        scoresJson.byTime = scoresJson.byTime.sort(function(a, b){
            if(parseInt(a.time) < parseInt(b.time)) return -1;
            if(parseInt(a.time) > parseInt(b.time)) return 1;
            return 0;
        }).slice(0, 20);
        scoresJson.byMoves = scoresJson.byMoves.sort(function(a, b){
            if(parseInt(a.moves) < parseInt(b.moves)) return -1;
            if(parseInt(a.moves) > parseInt(b.moves)) return 1;
            return 0;
        }).slice(0, 20);

        fs.writeFile("scores.json", JSON.stringify(scoresJson), function(err) {
            if(err) {
                return console.log(err);
            }

            res.json(getScoresFromFile());
        });
    })


/**
 * /api/pupit GET
 * Given an image URL, crop and size it to the given dimensions and respond
 * with the proccessed image. This is very quick & dirty, but works well
 * enough for this prototype app
 */
router.route('/pupit')
    .get(function(req, res) {
        var tmp = require('tmp');
        var Jimp = require("jimp");
        var fs = require('fs');
        var url = req.query.url;
        var width = parseInt(req.query.width);
        var height = parseInt(req.query.height);

        Jimp.read(url, function (err, image) {
            if (err) {
                res.status(500).end();
            } else {
                const fileName = tmp.tmpNameSync() + ".jpg";
                image.cover(width, height)
                    .quality(90)
                    .write(fileName, function(){
                        res.sendFile(fileName, {}, function() {
                            fs.unlinkSync(fileName);    // Delete temp file!
                        });
                    });
            }
        });
    });

app.use('/api', router);

// Tell the web server to start listening!
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
