const { Browser, newPage,executablePath } =require('puppeteer');
const puppeteer = require('puppeteer-extra');
const { existsSync } = require('fs');


const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

exports.newBrowser = async(payload)=>{
	const puppeteerOptions = {
		headless: false,
		ignoreDefaultArgs: ["--enable-automation"],
		args: [
			
			// '--use-fake-ui-for-media-stream',
			// '--use-fake-device-for-media-stream',
			// '--use-file-for-fake-audio-capture=/home/mj/experiment/meet-the-bots/example.wav',
			// '--allow-file-access',
			// '--lang=en',
			// '--no-sandbox',
            "--auto-select-tab-capture-source-by-title=Microsoft",
            '--start-maximized'
		],
		env: {
			LANG: 'en',
		},
		
        // executablePath:executablePath(),
      
        executablePath:'C:/Program Files/Google/Chrome/Application/Chrome.exe'
		
	};

	if (existsSync('/usr/bin/chromium-browser')) {
		console.log('Altering puppeteer chromium path...');
		puppeteerOptions.executablePath = '/usr/bin/chromium-browser';
	}
// console.log(executablePath());
	const browser = await puppeteer.launch(puppeteerOptions);
	browser
		.defaultBrowserContext()
		.overridePermissions('https://teams.microsoft.com/', [
			'microphone',
			'camera',
			'notifications',
		]);

		browser
		.defaultBrowserContext()
		.overridePermissions('https://lightbulb.tiiny.site/', [
			'microphone',
			'camera',
			'notifications',
		]);
		const page = await browser.newPage();
// setTimeout()
// await newPage.setViewport({ width: 1500, height: 768});


  await page.goto('https://lightbulb.tiiny.site/');
  let newPage = await browser.newPage();
  

// //==============================================================================================
const url = "https://teams.microsoft.com/l/meetup-join/19%3ameeting_OTkyMDE1YTMtYWE5NC00NWU2LWIzOWMtYzNmYzU2NjViN2Qy%40thread.v2/0?context=%7b%22Tid%22%3a%2282cb77e5-b2fd-4c87-8739-2727d9a86da0%22%2c%22Oid%22%3a%22135e2a95-ffe0-4a60-8e6b-0684ffdded7c%22%7d"
// console.log("url   ====",url);
await newPage.goto(url)

await newPage.waitForTimeout(1000)
let newP = await browser.newPage();
newPage.close()
// await newP.setUserAgent(userAgent.toString());
// await newPage.close()
await newP.goto(url)
// const stream = await getStream(newP, { audio: true, video: true });
// console.log("recording");
// stream.pipe(file);
await newPage.waitForTimeout(2000)

const aa = await newP.waitForSelector('button[data-tid=joinOnWeb]');
await newP.click('button[data-tid=joinOnWeb]')
console.log(">>>>>>>>>>>>>>>>>>>>>",aa);
await newP.waitForTimeout(15000)
const ab = await newP.waitForSelector('#preJoinAudioButton');
await newP.click('#preJoinAudioButton')
await newP.waitForSelector('input[id=username]')
await newP.focus('input[id=username]')
// // await newP.$eval('input[id=username]', element => element.value = 'Sumit');
await newP.keyboard.type('LigthBulb', { delay: 15 });
// await newP.waitForTimeout(5000)
await newP.keyboard.press('Tab');
await newP.keyboard.press('Tab');
await newP.keyboard.press('Enter');
await newP.keyboard.down('Shift');
await newP.keyboard.press('Tab');
await newP.keyboard.up('Shift');

await newP.waitForTimeout(1000)
await newP.keyboard.press('Enter');


console.log("Tab pressed");
	return browser;
}

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

