import http from 'http';
import json from './middleware/json.js';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto';

const database = new Database()


const server = http.createServer(async (req, res) => {
	
const { method, url } = req
  
	await json(req, res)

	if (method === 'GET' && url === '/users') {
		const users = database.select('users')
		return res
			.end(JSON.stringify(users))
	}

	if (method === 'POST' && url === '/users') {
		const { name, email } = req.body

		const user ={
			id: randomUUID(),
			name,
			email,
		}
		database.insert('users',user)

		return res.writeHead(201).end()
	}
})

server.listen(3333);
