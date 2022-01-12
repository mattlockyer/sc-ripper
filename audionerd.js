import fs from 'fs'
import fetch from 'node-fetch'
import puppeteer from 'puppeteer';

const delay = (dur) => new Promise(r => setTimeout(r, dur))

console.log(process.argv)

const QUERY = process.argv[2] || 'Skatebard'
const dir = 'AN - ' + QUERY + '/'

const downloadFile = (async (url, path) => {
	try {
		fs.mkdirSync(dir);
	} catch(e) {}
	const res = await fetch(url);
	const fileStream = fs.createWriteStream(path);
	await new Promise((resolve, reject) => {
		res.body.pipe(fileStream);
		res.body.on("error", reject);
		fileStream.on("finish", resolve);
	});
});

const playlist = async () => {
	const url = 'https://audionerd.ru/music/' + encodeURIComponent(QUERY.toLowerCase());

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	page.setViewport({ width: 1280, height: 926 });
	console.log('Getting url:', url);
	await page.goto(url, {waitUntil: 'networkidle2'});

	const links = await page.evaluate(() => {
		const extLinks = Array.from(document.querySelectorAll('a.track-mail__download'));
		const times = Array.from(document.querySelectorAll('div.div_for_track_Item__meta span')).map(e => parseInt(e.innerText.split(':')[0]));
		return extLinks.map(a => 'https:' + a.getAttribute('href')).filter((_, i) => times[i] < 20);
	});

	await browser.close();

	for (let i = 0; i < links.length; i++) {
		const url = links[i]
		let fn = dir + url.split('/')[5] + '.mp3'
		console.log(i, '/', links.length, fn);
		await downloadFile(url, fn)
		await delay(30000 + Math.random() * 30000) // approx 1 every 30s to 1m
	}
}

playlist()
