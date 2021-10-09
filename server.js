// optional: allow environment to specify port
const port = process.env.PORT || 83;
const s_port = process.env.PORT || 8083;
const path = __dirname;

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/www.giantiot.com/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/www.giantiot.com/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

// wire up the module
const express = require('express');
// create server instance
const app = express();
// bind the request to an absolute path or relative to the CWD
app.use(express.static(__dirname + '/dist'));

app.get('/*', function (req,res) {
  res.sendFile(path + "/dist/" + "index.html");
  console.log("req recv");
});

app.get('*', function (req,res) {
  res.sendFile(path + "/dist/" + "index.html");
  console.log("entry req recv");
});


// start the server
// app.listen(port, () => console.log(`Listening on port ${port}`));

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(port, () => console.log(`Listening on port ${port}`));
httpsServer.listen(s_port, () => console.log(`Listening on port ${s_port}`));
