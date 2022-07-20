const path = require('path');
const os = require('os');
const fs = require('fs');
const { moveCursor } = require('readline');
// 계획
// 1. 사용자가 원하는 폴더의 이름을 받아옴

const folder = process.argv[2];
const workingDir = path.join(os.homedir(), 'Pictures', folder);
console.log(workingDir);
if (!folder || !fs.existsSync(workingDir)) {
	console.error('🥲   Please enter folder name in Pictures');
	return;
}

// 2. 그 폴더안에 video, captured, duplicated 폴더를 만듬
const videoDir = path.join(workingDir, 'video');
const capturedDir = path.join(workingDir, 'captured');
const duplicatedDir = path.join(workingDir, 'duplicated');

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

// 3. 폴더 안에 있는 파일들을 다 돌면서 해당하는 mp4|mov, png|aae, img
fs.promises.readdir(workingDir).then(processFiles);

function processFiles(files) {
	files.forEach((file) => {
		if (isVideoFile(file)) {
			move(file, videoDir);
		} else if (isCapturedFile(file)) {
			move(file, capturedDir);
		} else if (isDuplicatedFile(files, file)) {
			move(file, duplicatedDir);
		}
	});
}

function isVideoFile(file) {
	const regExp = /(mp4|mov)$/gm;
	const match = file.match(regExp);
	return !!match;
}
function isCapturedFile(file) {
	const regExp = /(png|aae)$/gm;
	const match = file.match(regExp);
	return !!match;
}

function isDuplicatedFile(files, file) {
	// IMG_XXX -> IMG_EXXX
	if (!file.startsWith('IMG_') || file.startsWith('IMG_E')) {
		return false;
	}
	const edited = `IMG_E${file.split('_')[1]}`;
	const found = files.find((f) => f.includes(edited));
	return !!found;
}

function move(file, moveDir) {
	console.info(`move ${file} to ${moveDir}`);
	const oldPath = path.join(workingDir, file);
	const newPath = path.join(moveDir, file);
	fs.promises
		.rename(oldPath, newPath) //
		.catch(console.error);
}
