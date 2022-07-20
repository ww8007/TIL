// const fs = require('fs');

const gfs = require('fs');
const fs = require('fs').promises;
const path = require('path');

const videoFormat = ['.mp4', '.mov'];
const captureFormat = ['.aae', '.png'];

function isVideo(format) {
	return videoFormat.includes(format) ? true : false;
}

function isCaptured(format) {
	return captureFormat.includes(format) ? true : false;
}

function mkdirAndMove(mkdirPath, baseName) {
	if (!gfs.existsSync(mkdirPath)) gfs.mkdirSync(mkdirPath);

	fs.rename(`./Pictures/${baseName}`, `./${mkdirPath}/${baseName}`).catch(
		console.error
	);
}

fs.readdir('./Pictures')
	.then((files) => {
		files.forEach((f) => {
			const { ext, name, base } = path.parse(f);

			isVideo(ext) && mkdirAndMove('video', base);
			isCaptured(ext) && mkdirAndMove('captured', base);
			if (ext === '.jpg' && !name.includes('E'))
				mkdirAndMove('duplicated', base);
		});
	})
	.catch(console.error);
