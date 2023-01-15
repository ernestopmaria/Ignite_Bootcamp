import { Readable, Transform, Writable } from 'node:stream';

class oneToHundred extends Readable {
	index = 1;

	_read() {
		setTimeout(() => {
			const i = this.index++;
			if (i > 100) {
				this.push(null);
			} else {
				const buff = Buffer.from(String(i));
				this.push(buff);
			}
		}, 1000);
	}
}

class InverseNumberStream extends Transform {
	_transform(chunk, encoding, callback) {
		const tranformed = Number(chunk.toString()) * -1;
		callback(null, Buffer.from(String(tranformed)));
	}
}

class MultiplayByTenStream extends Writable {
	_write(chunk, encoding, callback) {
		console.log(Number(chunk.toString()) * 10);
		callback();
	}
}
new oneToHundred()
	.pipe(new InverseNumberStream())
	.pipe(new MultiplayByTenStream());
