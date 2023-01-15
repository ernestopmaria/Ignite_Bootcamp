import http from 'http';

const users = [];

const server = http.createServer((req, res) => {
	const { method, url } = req;
	if (method === 'GET' && url === '/users') {
		return res
			.setHeader('Content-type', 'application/json')
			.end(JSON.stringify(users));
	}

	if (method === 'POST' && url === '/users') {
		const user = users.push({
			id: 1,
			nome: 'ernesto',
			idade: 12,
			email: 'ernestomaria93@gmail.com',
		});
		return res.end('Criacão de usuarios');
	}
	return res.end('On fire 2');
});

server.listen(3333);
