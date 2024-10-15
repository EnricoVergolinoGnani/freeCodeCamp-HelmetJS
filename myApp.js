const express = require('express');
const app = express();

const helmet = require('helmet');

// Using the helmet.hidePoweredBy() middleware to remove the X-Powered-By header.
app.use(helmet.hidePoweredBy());

// Using helmet.frameguard() to set the X-Frame-Options header as DENY.
app.use(helmet.frameguard({action: 'deny'}));

// Using helmet.xssFilter() to enable the X-XSS-Protection HTTP header.
app.use(helmet.xssFilter());

// Using helmet.noSniff() to set the X-Content-Type-Options header to nosniff.
app.use(helmet.noSniff());

// Using helmet.ieNoOpen() to set X-Download-Options header to noopen.
app.use(helmet.ieNoOpen());

// Configuring helmet.hsts() to use HTTPS for the next 90 days.
const ninetyDaysInSeconds = 90*24*60*60;
app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true}))

// Disabling DNS prefetching, at the cost of a performance penalty.
app.use(helmet.dnsPrefetchControl());




























module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
