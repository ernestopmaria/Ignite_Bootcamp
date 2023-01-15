import { Readable } from 'node:stream';

class oneToHundred extends Readable {
	index = 1;

	_read() {
		setTimeout(() => {
			const i = this.index++;
			if (i > 5) {
				this.push(null);
			} else {
				const buff = Buffer.from(String(i));
				this.push(buff);
			}
		}, 1000);
	}
}

fetch('http://localhost:3334', {
	method: 'POST',
	body: new oneToHundred(),
	duplex: 'half',
})
	.then(response => {
		return response.text();
	})
	.then(data => {
		console.log(data);
	});
