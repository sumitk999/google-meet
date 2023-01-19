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
            // "--auto-select-tab-capture-source-by-title=Meet",
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
	// browser
	// 	.defaultBrowserContext()
	// 	.overridePermissions('https://meet.google.com/', [
	// 		'microphone',
	// 		'camera',
	// 		'notifications',
	// 	]);

		// browser
		// .defaultBrowserContext()
		// .overridePermissions('http://127.0.0.1:5500', [
		// 	'microphone',
		// 	'camera',
		// 	'notifications',
		// ]);
		// const page = await browser.newPage();

		let newPage = await browser.newPage();
		await newPage.goto('https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=id_token&scope=openid%20profile&client_id=5e3ce6c0-2b1f-4285-8d4b-75ee78787346&redirect_uri=https%3A%2F%2Fteams.microsoft.com%2Fgo&state=eyJpZCI6ImY2MDExZDljLWRjMmEtNGE3OC1iMjc3LTA3ZGZjNTE5YTBmZSIsInRzIjoxNjc0MDE3NzczLCJtZXRob2QiOiJyZWRpcmVjdEludGVyYWN0aW9uIn0%3D&nonce=a28fbb80-2e56-4407-a7d6-8e2c410f23dd&client_info=1&x-client-SKU=MSAL.JS&x-client-Ver=1.3.4&client-request-id=695651dd-0282-4f54-9ba3-aeb6cd5e951c&response_mode=fragment&sso_reload=true');
  
		await newPage.mouse.click(1140, 550, {delay: 3000, button: 'right'});
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
