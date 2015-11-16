'use strict';

const Router = require('routes');

module.exports = function(db) {
	const router = Router();
	router.addRoute('/entries/new', require('./entry_new')(db));
	router.addRoute('/', require('./home')(db));
	return router;
}
