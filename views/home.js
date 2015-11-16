const h = require('virtual-dom/h');

module.exports = function home(db) {
	return function view(req, res, m, show) {
		var entries = [];

		// Get all entries from the database and then render the view
		db.createReadStream().on('data', function onData(entry) {
			entries.push(entry);
		}).on('end', function onEnd() {
			show(render());
		});

		function render() {
			return h('div', [
					renderForm(),
					renderList()
			]);
		}

		function renderForm() {
			return h('form', {
				method: 'post',
				action: '/entries/new'
			}, [
				h('label', [ 'Entry',
					h('input', { type: 'text', name: 'entry' })
				]),
				h('input', { type: 'submit', value: 'Add' })
			]);
		}

		function renderList() {
			return h('ul', [
				entries.map(function(entry) {
					return h('li', { 'data-id': entry.key }, [
							entry.value,
							h('a', { href: '/entries/' + entry.key + '/delete'}, 'Remove')
					]);
				})
			]);
		}
	}
}
