import fs from 'fs'
import fetch from 'node-fetch'
import cheerio from 'cheerio';

const downloadFile = (async (url, path) => {
	const res = await fetch(url);
	const fileStream = fs.createWriteStream(path);
	await new Promise((resolve, reject) => {
		res.body.pipe(fileStream);
		res.body.on("error", reject);
		fileStream.on("finish", resolve);
	  });
});

const init = async () => {

	const res = await fetch('https://www.klickaud.co/download.php', {
		method: 'POST',
		body: 'value=https%3A%2F%2Fsoundcloud.com%2Fskatebard%2Fskatebard-data-italia%3Fin%3Dskatebard%2Fsets%2Foriginal-tracks&afae4540b697beca72538dccafd46ea2ce84bec29b359a83751f62fc662d908a=2106439ef3318091a603bfb1623e0774a6db38ca6579dae63bcbb57253d2199e',
		headers: { 'content-type': 'application/x-www-form-urlencoded' }
	}).then(r => r.text())

	const $ = cheerio.load(res);

	const link = $('#dlMP3').attr('onclick').split("downloadFile('")[1].split("',")[0]

	console.log(link)

	downloadFile(link, './song.mp3')

}

init()
