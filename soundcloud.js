import fs from 'fs'
import fetch from 'node-fetch'
import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const delay = (dur) => new Promise(r => setTimeout(r, dur))

const downloadFile = (async (url, path) => {
	const res = await fetch(url);
	const fileStream = fs.createWriteStream(path);
	await new Promise((resolve, reject) => {
		res.body.pipe(fileStream);
		res.body.on("error", reject);
		fileStream.on("finish", resolve);
	});
});

const download = async (url, fn) => {

	const res = await fetch('https://www.klickaud.co/download.php', {
		method: 'POST',
		body: `value=${encodeURIComponent(url)}&afae4540b697beca72538dccafd46ea2ce84bec29b359a83751f62fc662d908a=2106439ef3318091a603bfb1623e0774a6db38ca6579dae63bcbb57253d2199e`,
		headers: { 'content-type': 'application/x-www-form-urlencoded' }
	}).then(r => r.text())

	const $ = cheerio.load(res);

	const link = $('#dlMP3').attr('onclick').split("downloadFile('")[1].split("',")[0]

	downloadFile(link, './' + fn)
}

const playlist = async () => {

	/*
	https://soundcloud.com/nathaniel-williams-6/sets/motor-city-drum-ensemble-1
	https://soundcloud.com/johnnieromance/sets/motor-city-drum-ensemble-dj-1
	https://soundcloud.com/nik-go-302352531/sets/related-tracks-hot-since-82
	https://soundcloud.com/technocathedrale/sets/hot-since-82-top-ten-tracks-2017
	https://soundcloud.com/cuernavacaciones-vacaciones/sets/related-tracks-friendly-fires
	https://soundcloud.com/trueromancerec/sets/tensnake-pres-best-of-true
	https://soundcloud.com/trueromancerec/sets/tensnake-pres-best-of-true-1
	*/

	const scBaseUrl = 'https://soundcloud.com';
	const scPlaylistUrl = `${scBaseUrl}/skatebard/sets/remixes`;

	// function executed in browser
	function extractItems() {
		const extLinks = Array.from(document.querySelectorAll('a.trackItem__trackTitle.sc-link-dark.sc-font-light'));
		return extLinks.map(a => a.getAttribute('href'));
	}

	// scroll & extract
	async function scrapePlaylist(page, extractItemsFunc, itemTargetCount, scrollDelay = 1000) {
		await page.setDefaultNavigationTimeout(1000);
		try {
			for (let i = 0; i < 20; i++) {
				await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
				await delay(500 + Math.floor(Math.random()*500))
			}
		} catch (e) { console.error(e); }
		const items = await page.evaluate(extractItemsFunc);
		return items;
	}


	(async () => {
		// set up the browser and a page
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		page.setViewport({ width: 1280, height: 926 });
		await page.goto(scPlaylistUrl);

		console.log('Getting playlist:', scPlaylistUrl);
		// scroll and extract items from the page.
		const items = await scrapePlaylist(page, extractItems, 100);
		const trackLinks = items.map((item) => {
			const link = /^(\/.*)\?in.*/.exec(item);
			return `${scBaseUrl}${link[1]}`;
		});

		// close browser
		await browser.close();

		// output
		console.log(trackLinks);

		for (let i = 0; i < trackLinks.length; i++) {
			const url = trackLinks[i]
			let fn = url.split('/')
			fn = fn[3] + '-' +  fn[4] + '.mp3'
			console.log('Downloading:', url, fn);
			await download(url, fn)
			await delay(5000)
		}

	})();

}

playlist()
