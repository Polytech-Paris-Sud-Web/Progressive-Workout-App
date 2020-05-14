//Install express server
const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses if this request header is present
    return false;
  }
  // fallback to standard compression
  return compression.filter(req, res);
};

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/ProgressiveWorkoutApp'));
app.use(
  compression({
    // filter decides if the response should be compressed or not,
    // based on the `shouldCompress` function above
    filter: shouldCompress,
    // threshold is the byte threshold for the response body size
    // before compression is considered, the default is 1kb
    threshold: 0,
  })
);

app.get('*', function (req, res) {
  res.redirect('https://' + req.headers.host + req.url);
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/ProgressiveWorkoutApp/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
