'use strict';

const fs = require('fs');
const hyperstream = require('hyperstream');
const path = require('path');
const toHTML = require('vdom-to-html');
const levelup = require('level');
const db = levelup('./data');

// Get router for our views
const router = require('./views')(db);

module.exports = function handler(req, res) {
	// Router returns a match object instead of calling the function since you
	// sometimes want to add additional parameters from the current context
	const match = router.match(req.url);

	// If we can't find a matching route we just send a 404 response back with
	// a custom 404 page from static/404.html
	if (!match) {
		res.writeHead(404);
		fs.createReadStream(path.join(__dirname, 'static', '404.html')).pipe(res);
		return;
	}

	// We call the matching view sending in a function which the view uses to
	// return its virtual-dom tree which we then stringify and add to the page
	match.fn(req, res, match, function show(tree) {
		fs.createReadStream(path.join(__dirname, 'static', 'index.html'))
			.pipe(hyperstream({ '#app': toHTML(tree) }))
			.pipe(res);
	});
}
