//Install express server
const express = require('express');
const path = require('path');
var forceSsl = require('force-ssl-heroku');
const compression = require('compression');

const app = express();
app.use(compression()).use(forceSsl);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/ProgressiveWorkoutApp'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/ProgressiveWorkoutApp/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
