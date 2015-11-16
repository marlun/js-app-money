#!/usr/bin/env node

var http = require('http');
var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
    alias: { p: 'port' },
    default: { port: 8000 }
});

// Our handler is the project index.js file which exports the handler
var handler = require('../');

var server = http.createServer(handler);
server.listen(argv.port, function () {
    console.log('Listening on http://127.0.0.1:'  + server.address().port);
});
