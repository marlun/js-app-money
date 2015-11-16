const h = require('virtual-dom/h');
const formBody = require('body/form');
const uuid = require('node-uuid');

module.exports = function home(db) {
	return function view(req, res, m, show) {
		formBody(req, res, function(err, body) {
			const ws = db.createWriteStream();
			ws.end({ key: uuid.v4(), value: body.entry });
			res.writeHead(302, {
				'Location': 'http://' + req.headers['host'] + '/'
			});
			res.end();
		});
	}
}
