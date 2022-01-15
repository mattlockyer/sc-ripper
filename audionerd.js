import fs from 'fs'
import { pipeline } from 'stream/promises';
import fetch from 'node-fetch'
import puppeteer from 'puppeteer';



const delay = (dur) => new Promise(r => setTimeout(r, dur))

console.log(process.argv)

// const COOKIE = 'pmvid=eb52653e-ec01-4089-a6eb-d2345133f4c0; cf_chl_2=52e43d0d64b81b2; cf_chl_prog=x13; cf_clearance=l8BshBH8hmo01.jbJV_HUT4eWyex.0M8wwhbk0efIfc-1642267050-0-150'
const COOKIE = 'pmvid=eb52653e-ec01-4089-a6eb-d2345133f4c0; cf_chl_2=84c8c4bb4aea1a4; cf_chl_prog=x13; cf_clearance=V7M.HEuWQpDVwbLDaNVweoFMdlGpTpHJyBOsyhyL0XE-1642277758-0-250'
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
const QUERY = process.argv[2] || 'Skatebard'
const dir = 'AN - ' + QUERY + '/'

const downloadFile = (async (url, path) => {
	try {
		fs.mkdirSync(dir);
	} catch(e) {}

	await pipeline((await fetch(url, {
		headers: {
			'user-agent': UA,
			'cookie': COOKIE
		}
	})).body, fs.createWriteStream(path));
});

const links = [
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzc5NGZiNmVmOTIyMmFmNTI4YjQ3ODk2MjY5Y2MyNjVkLm1wMw==/The%20Martinez%20Brothers%20-%20%20Broke%20In%20The%20BX",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzJkOWU3YzNhOWJmNjNmNjg1MDdiMWIxYWYxNWI2NWE0Lm1wMw==/The%20Martinez%20Brothers%20-%20H%202%20Da%20Izzo%20(Peggy%20Gou%20Remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2ZhOWMyMzhkOTIxMDRkZmQ3MDRmMmQ3NGFiYjcwMzg2Lm1wMw==/Rudimental%20&%20The%20Martinez%20Brothers%20-%20No%20Fear%20(feat.%20Donna%20Missal)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzQxM2I0NzkyZWEyZmEzNTkxYzNjZDYxZTA2MGM3Nzk5Lm1wMw==/Deetron%20-%20Mechanolicous%20(The%20Martinez%20Brothers%20Edit)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2FhNjlkZGRjOGYyNzk3ZmJlZWVlMmZmMGE3NGFhM2YwLm1wMw==/01.%20JCMBcast%20010%20-%20Rudimental%20x%20The%20Martinez%20Brothers%20-%20No%20Fear%20(Original%20Mix)%20[Major%20Toms%20Records]",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzVkNTZjYzM0YmRjZDM2NGRkOWE5YmYyYWQyNGYzMzI0Lm1wMw==/The%20Martinez%20Brothers%20-%20H%202%20Da%20Izzo",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2VjYjljMzJjNjVjYmRmNDFiNGE0OTE3ZjhkMWJiOWY2Lm1wMw==/Cliff%20Martinez%20&%20Gregory%20Tripi%20-%20Ask%20Him%20Why%20He%20Killed%20My%20Brother",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzEwNjE3YjZlMWIyNWY5ZThiNWZjNDFhYmQ1NjBhZTlmLm1wMw==/The%20Martinez%20Brothers%20-%20Space%20Jams%20-%20Hitman%20[TMB%20mix]",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzBmYjA2YTZmZDU4MzJlMjgwNTdhZjIyYWYwYzFiODVkLm1wMw==/Santos%20Resiak%20-%20A%20Better%20Light%20(The%20Martinez%20Brothers%20Remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzM0OWQ4NGU4ZDdhNDUyNTRmYzRhNmNkM2E3MzdhYzkyLm1wMw==/One%20Brother%20feat.%20Frankee%20-%20Under%20the%20Water%20(Martinez%20&%20Meste%C3%B1o%20Dub%20Remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2VjYzBlOTBiOTZiMWE5NWI4YjI4YjQ3MDA1ZjM0MGU4Lm1wMw==/The%20Martinez%20Brothers%20-%20Broke%20in%20the%20BX",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzZjNDI0YzM4M2FkYjUzZjVkYTlhYjVkMWQwOWZlYTQzLm1wMw==/Santos%20Resiak%20feat.%20Dilo%20-%20%20A%20Better%20Light%20(The%20Martinez%20Brothers%20Remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2MzZGU5ZWIxN2I1NzZmODI3NWI4NmIwNGYzNmE3NjBiLm1wMw==/The%20Martinez%20Brothers%20-%20Issshhh%20(Main%20Mix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzE3MTg1NjZlOGI1YzQ2NWY4MjNiYWRhZjY2OWIzODUwLm1wMw==/Basement%20Jaxx%20-%20Sneakin'%20Toronto%20(The%20Martinez%20Brothers%20Remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2EzMmFhZWYwYTI0NmU5ODhkM2Y4MGM0MGE1MTg2NzAzLm1wMw==/D'Julz%20-%20Da%20Madness%20(The%20Martinez%20Brothers%20edit)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzM3YWM4OGNlNzhiMmNlYzMzM2Y2OTg5NWIzMGRmMzUwLm1wMw==/Blanc%20-%20Lil%20Yachty%20-%20SaintLaurentYSL%20ft.%20Lil%20Baby%20(The%20Martinez%20Brothers%20Re-Edit)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2Y1NDJjMjRlZTk1OWI3MGYwYTZhMTE2NmM2NTFkN2EzLm1wMw==/Argy%20&%20The%20Martinez%20Brothers%20%20-%20Debbie%20Downer%20(Huxley%20'Let%20It%20Go'%20Edit)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzRjNWNlNmYxMmNjZDU4MjMzZDRkMDMyOTU1Nzk2N2U1Lm1wMw==/Burnski%20-%20Lost%20In%20The%20Zoo%20(The%20Martinez%20Brothers'%20Bronx%20Zoo%20Mix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzY5ZjU4NDcxMGVhOWUxNTliMTIzZDM4YjBkNTQxNDU1Lm1wMw==/Santos%20Resiak%20-%20A%20better%20light%20(The%20Martinez%20Brothers%20remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2UyMmE4NzBjMDYxMmNmMDFkMmEzMzlkNjM0N2U1NmY4Lm1wMw==/Tiga%20&%20The%20Martinez%20Brothers%20-%20Blessed",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzQzMTQ0ZWVhNDhkODEyM2VjYzQyMGI0OGU2NjM1YTk1Lm1wMw==/The%20Martinez%20Brothers%20Live%20%20-%20@%20Surfcomber%20Hotel,%20Miami%20(WMC)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzk2YTlkYmEyZjI1ZTdmZGExNDZlOWJlYThhZmQ4ODZkLm1wMw==/The%20Martinez%20Brothers%20-%20Stuff%20In%20The%20Trunk%20feat.%20Miss%20Kittin",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzRjNGM0NTNiZDhhNTBiZjI4NmIxZjM2ZWZjOWNjMDczLm1wMw==/Fosky%20-%20Shiva%20feat.%20Shiva%20(Martinez%20Brothers%20Remix)%20[Tech%20House]",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2JjYTc2YmRiZjg2NmJmOTc3ZjczY2I5YjNmYzE4ODZkLm1wMw==/Riva%20Starr%20vs.%20Major%20Lazer%20-%20Jump%20(The%20Martinez%20Brothers%20Remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzE3MjBjNzZlMmMzMzVkZmMxNTNkOWNjMThmOWQxNTc2Lm1wMw==/The%20Martinez%20Brothers%20-%20Dont%20no%20yet",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzEwNmJmMDZjM2JmMjlmMTllMjEwMTE0ZDhjOGFiOTAwLm1wMw==/Cliff%20Martinez%20-%20Ask%20Him%20Why%20He%20Killed%20My%20Brother",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzdhNWY1Y2NiZDI0MDE4NGY3Zjg4MDliOTI2YjUzNWEwLm1wMw==/The%20Martinez%20Brothers%20-%20Deep%20inside",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzhlYzhkMjBjNThiODY0ZGMxMzFhNThhN2EwNTBkNmEzLm1wMw==/Green%20Velvet%20-%20Bigger%20Than%20Prince%20(Martinez%20Brothers)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzg5Yjc0MDlmOGJjZGU5MGJjMDg0YWNiMWVmYTY0ZWJlLm1wMw==/The%20Martinez%20Brothers%20-%20My%20Rendition%20(TMB%20main%20mix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzcxZmUwNTlkMTdhODcyY2U1YmMyMzZiMjQ1Y2FiY2E5Lm1wMw==/Tiga,%20The%20Martinez%20Brothers%20-%20Late%20Nite",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzk4YTM0MjViZjk5ZGUwYmUxOGQ4ZjBkMWRmYjI3NWZkLm1wMw==/The%20Martinez%20Brothers%20-%20do%20that%20two%20(yes%20baby)%20]",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzA0YWJhYTQyNGVhOTlmNzE5YjBlNzc0OTJkNTk5NDFjLm1wMw==/The%20Martinez%20Brothers%20-%20Tree%20Town%20(Original%20Mix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzhhNWE3ZWNmNmIyZjA0OGNkZWI1OWU2OTQ4OGI2MTRiLm1wMw==/Damian%20Lazarus%20-%20Fabric%2054%20(2010)%20-%20The%20Martinez%20Brothers%20-%20Broke%20In%20The%20BX",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2E2ZTI4ZWQ2MTA0ZWI1ZTE2N2ZlNTM3OTc2NzBhYjc1Lm1wMw==/The%20Martinez%20Brothers%20-%20Won't%20Somebody%20(Original%20Mix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzFjNjcwM2MyZWZmNDFiYTZiODE4MWZhN2UxOTliYjNhLm1wMw==/The%20Martinez%20Brothers%20-%20%20H%202%20Da%20Izzo",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2I4ODFkZjczMzkyYTM5YThkYzJiNzg0MzQ0Y2VmMjJkLm1wMw==/Josepo%20&%20Tony%20Martinez%20-%20Lake%20a%20flame%20(%20%20mavse%20brother",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzBlMjUwZTUzNjE0ZTA3Y2ZmYzNhMWUyMzUzODViOWNhLm1wMw==/Green%20Velvet%20-%20Bigger%20Than%20Prince%20(The%20Martinez%20Brothers%20remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzg0ODFlZDUxYWU1ZTJhNzJjYzI0NTE5ZDQ4ZmU3NTkwLm1wMw==/The%20Martinez%20Brothers%20-%20Broke%20In%20The%20BX",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzE2NzRlZTVlNzg0NDY0OWYyNWE3NmZjOGU5Y2UzZTlkLm1wMw==/The%20Martinez%20Brothers%20-%20Don't%20No%20Yet",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzNjOWVlOTAxNWU4ZTgwZDViMmVjNmE1MTg4NTY3NjE0Lm1wMw==/The%20Martinez%20Brothers%20-%20H%202%20da%20Izzo",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzQ0YjRlZDgxZjIzZTUwMzc5MmQ2M2E4MDU3NjRiNGRhLm1wMw==/Techno.UA%20-%20Martinez%20Brothers%20Issshhh%20(Main%20Mix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzA0ZTI3YmM5OGQwMzFmZjNmMjMwMTcxOGNiZjg1MTFkLm1wMw==/The%20Martinez%20Brothers%20-%20H%202%20Da%20Izzo",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2IyMDYyMDc4Y2Q3MDM0Njk5OWNkYmM1ZTQ5OGNmY2Q4Lm1wMw==/Burnski%20-%20Lost%20In%20The%20Zoo%20[Martinez%20Brothers'%20Bronx%20Zoo%20Mix]",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzAzMGZlMTNiNzIwMjVjYTViMzRmZGIyYTkzN2ViMWEzLm1wMw==/Fosky%20feat.%20Shiva%20-%20Shiva%20(Martinez%20Brothers%20remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2M0OTQzM2NhODY4Njc1ZTE1MTMxMDQ1MzExOGNmYWVjLm1wMw==/%E2%96%B6%20Andrea%20Oliva%20-%20My%20Way%20(The%20Martinez%20Brothers%20Remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzYyNGM2ZTBiYzYxZDQ4YzA5NThjZTZmMDgyNTJhMzYyLm1wMw==/Deetron%20-%20Mechanolicious%20(The%20Martinez%20Brothers%20Edit)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzEyMzkyYmQ2OTIwZDI3YjI2NmM2NDNhZDMxMTVhOWZmLm1wMw==/Dj%20Robert%20&%20Martinex%20Bros%20-%20Electrified%20-%20Martinez%20Brother",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2E3YzM2YTg2ZTBjYzEyNDFiZjA4ZjE3ODQ1ZmMzMDMwLm1wMw==/Argy%20&%20The%20Martinez%20Brothers%20-%20Who%20Made%20Who%20(HateLate%20Houseapella%20Edit)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzk4YmFjY2U0N2UzOTQ5Zjg3MzM3Y2MxYzI2ODQ4ODBmLm1wMw==/Art%20Department%20-%20Kisses%20for%20Roses%20(The%20Martinez%20Brothers%20Remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2NlM2JiNDFkZGU2YWQ2MDE4ZDg0YjBkZGU4NzFiY2EzLm1wMw==/%20-%20DJ%20ROBERT%20&%20THE%20MARTINEZ%20BROTHERS%20-%20Dreaming%20About%20Paprica%202003%20(2Players%20remix).wmv",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzkxNGVmMjY5ZmRhNDM2ODMwNTJkZDVkZTBjZmFhY2Q4Lm1wMw==/argy%20&%20the%20martinez%20brothers%20-%20where's%20mr.%20brown?",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2RhMGUwYjZkZGQzMzVkYWY3ZDA4NzhmODEzYmU5ODllLm1wMw==/Argy%20&%20The%20Martinez%20Brothers%20%20-%20Who%20Made%20Who%20(Vinyl%20Version)%20(These%20Days%20Records)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzFmZDZjMDA4OTNjOGVlZTM3MjQ3MmRjNmVlMTFiMGJlLm1wMw==/The%20Martinez%20Brothers%20-%20%20Issshhh%20(Beats)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2JlNzkwYjcyNTQ2Njg5MDY5MjU0ZjNlMzZmODBmMjBmLm1wMw==/One%20Brother%20feat.%20Frankee%20-%20%20Under%20The%20Water%20(Martinez%20&%20Masteno%20Dub%20Remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2IwZmZiNjhjN2M3MmViODI5YjU5NTQ5ODFjZmY5Yjg4Lm1wMw==/Rudimental%20&%20The%20Martinez%20Brothers%20-%20No%20Fear",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzE4ZWIzNTVhY2QyMmNjMTQzOWM2ODFlYjBjNmZkZDY1Lm1wMw==/One%20Brother%20feat%20Frankee%20-%20Under%20the%20Water(Martinez%20&%20Mesteno%20Main%20Remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzc2YzgwMTMzOWQ5OWFlNDI0YTMyOGMzOGM1OTc1OWQ4Lm1wMw==/Fosky%20feat.%20Shiva%20-%20Shiva%20(Martinez%20Brothers%20Remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlLzMxYjhhZGQ0MjVkN2M4MTQ3ZDBhMjFkNGQxNTYyOTNjLm1wMw==/%20shonky%20-%20le%20velour%20(the%20martinez%20brothers%20remix)",
    "https://audionerd.ru/mp3/Ly9tb29zaWMubXkubWFpbC5ydS9maWxlL2Q0ZjVmNDc4ODMyNWE3YWViYTBiNmJkZTNkOTFjNmJlLm1wMw==/The%20Martinez%20Brothers%20-%20The%20Causeway%20(Original%20Mix)Techno"
]

const downloadLinks = async () => {
	for (let i = 0; i < links.length; i++) {
		const url = links[i]
		let fn = dir + decodeURIComponent(url.split('/')[5]) + '.mp3'
		console.log(i, '/', links.length, fn);
		await downloadFile(url, fn)
		await delay(5000)
	}
}

downloadLinks()


/// deprecated use this on page, fill out cookie, update COOKIE

// Array.prototype.slice.call(document.querySelectorAll('.div_for_track_Item__meta')).map((row) => {
//     console.log(row)
//     if (parseInt(row.querySelector('span').innerText.split(':')[0]) < 20) { return null }
//     return row.querySelector('a').href
// }).filter(i => !!i)


const playlist = async () => {
	const url = 'https://audionerd.ru/music/' + encodeURIComponent(QUERY.toLowerCase());

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	const cookies = [
		{name: 'pmvid', value:'eb52653e-ec01-4089-a6eb-d2345133f4c0', domain: 'audionerd.ru'},
		{name: 'cf_chl_2', value:'e651b6357e25942', domain: 'audionerd.ru'},
		{name: 'cf_chl_prog', value:'x10', domain: 'audionerd.ru'},
		{name: 'cf_clearance', value:'d4YywB.c.RaVYbTimXqTUQwIwAdMhk7EzoSMxgPvtUc-1642261538-0-150', domain: 'audionerd.ru'},
	]

	page.setDefaultNavigationTimeout(10000);
	await page.setViewport({ width: 1920, height: 1080 });
	await page.setCookie(...cookies)
	await page.setUserAgent(UA)
	console.log('Getting url:', url);
	await page.goto(url, {waitUntil: 'networkidle2'}).catch((e) => console.warn(e));

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

// playlist()