const { Browser, newPage,executablePath } =require('puppeteer');
const puppeteer = require('puppeteer-extra');
const { existsSync } = require('fs');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

exports.newBrowser = async()=>{
	const puppeteerOptions = {
		headless: false,
		args: [
			// '--use-fake-ui-for-media-stream',
			// '--use-fake-device-for-media-stream',
			// '--use-file-for-fake-audio-capture=/home/mj/experiment/meet-the-bots/example.wav',
			// '--allow-file-access',
			// '--lang=en',
			// '--no-sandbox',
            "--auto-select-tab-capture-source-by-title=Meet",
            '--start-maximized'
		],
		env: {
			LANG: 'en',
		},
        executablePath: executablePath(),
		
	};

	if (existsSync('/usr/bin/chromium-browser')) {
		console.log('Altering puppeteer chromium path...');
		/* @ts-ignore */
		puppeteerOptions.executablePath = '/usr/bin/chromium-browser';
	}

	const browser = await puppeteer.launch(puppeteerOptions);
	browser
		.defaultBrowserContext()
		.overridePermissions('https://meet.google.com/', [
			'microphone',
			'camera',
			'notifications',
		]);

		browser
		.defaultBrowserContext()
		.overridePermissions('http://127.0.0.1:5500', [
			'microphone',
			'camera',
			'notifications',
		]);
		const page = await browser.newPage();
// setTimeout()
// await newPage.setViewport({ width: 1500, height: 768});

  await page.goto('http://127.0.0.1:5500/index.html');
  let newPage = await browser.newPage();

 
  await newPage.goto('https://meet.google.com/gkc-fjcm-otx');
//   await newPage.keyboard.type('LigthBulb', { delay: 15 });
  // console.log('turn off cam using Ctrl+E');
  await newPage.waitForTimeout(3000);
  await newPage.keyboard.down('ControlLeft');
  await newPage.keyboard.press('KeyE');
  await newPage.keyboard.up('ControlLeft');
  await newPage.waitForTimeout(100);

  // console.log('turn off mic using Ctrl+D');
  await newPage.waitForTimeout(1000);
  await newPage.keyboard.down('ControlLeft');
  await newPage.keyboard.press('KeyD');
  await newPage.keyboard.up('ControlLeft');
  await newPage.waitForTimeout(100);

  await newPage.keyboard.type('LigthBulb', { delay: 15 });

  await clickText(newPage, 'Ask to join');
  await clickText(newPage, 'Got it');

setTimeout(async()=>{
	const p = await peopleInMeet(newPage)
	console.log("peoples====>>>>>>> ",p.length);
},30000)
  
	return browser;
}

const peopleInMeet = async (page) => {
	return (await page.$$('span.zWGUib'))
		? await page.$$('span.zWGUib')
		: Promise.reject(new Error('peopleInMeet function failed'));
};
 const clickText = async (newPage, text, retries = 3) => {
	const elems = await newPage.$x(`//*[contains(text(),'${text}')]`);
	let clicked = false;
	for (const el of elems) {
		try {
			await el.click();
			clicked = true;
		} catch {
			// sometimes elements with the same text are found which are not clickable
		}
	}
	if ((elems.length === 0 || !clicked) && retries > 0) {
		await newPage.waitForTimeout(300);
		await clickText(newPage, text, retries - 1);
	}
};
// export async function newPage(browser: Browser): Promise<newPage> {
// 	const newPage = await browser.newPage();
// 	await newPage.setExtraHTTPHeaders({
// 		'Accept-Language': 'en',
// 		'sec-ch-ua':
// 			'"Chromium";v="94", "Microsoft Edge";v="94", ";Not A Brand";v="99"',
// 	});
// 	// Set the language forcefully on javascript
// 	await newPage.evaluateOnNewDocument(() => {
// 		Object.defineProperty(navigator, 'language', {
// 			get() {
// 				return 'en';
// 			},
// 		});
// 		Object.defineProperty(navigator, 'languages', {
// 			get() {
// 				return ['en'];
// 			},
// 		});
// 	});
	
// 	return newPage;
// }
