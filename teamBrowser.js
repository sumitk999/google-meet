const { Browser, newPage,executablePath } =require('puppeteer');
const puppeteer = require('puppeteer-extra');
const { existsSync } = require('fs');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

exports.newBrowser = async()=>{
	const puppeteerOptions = {
		headless: false,
		args: [
			
			'--use-fake-ui-for-media-stream',
			'--use-fake-device-for-media-stream',
			'--use-file-for-fake-audio-capture=/home/mj/experiment/meet-the-bots/example.wav',
			'--allow-file-access',
			'--lang=en',
			'--no-sandbox',
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
// setTimeout()
// await newPage.setViewport({ width: 1500, height: 768});


//   await page.goto('http://127.0.0.1:5500/index.html');
  let newPage = await browser.newPage();

 
//   await newPage.goto('https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=id_token&scope=openid%20profile&client_id=5e3ce6c0-2b1f-4285-8d4b-75ee78787346&redirect_uri=https%3A%2F%2Fteams.microsoft.com%2Fgo&state=eyJpZCI6ImY2MDExZDljLWRjMmEtNGE3OC1iMjc3LTA3ZGZjNTE5YTBmZSIsInRzIjoxNjc0MDE3NzczLCJtZXRob2QiOiJyZWRpcmVjdEludGVyYWN0aW9uIn0%3D&nonce=a28fbb80-2e56-4407-a7d6-8e2c410f23dd&client_info=1&x-client-SKU=MSAL.JS&x-client-Ver=1.3.4&client-request-id=695651dd-0282-4f54-9ba3-aeb6cd5e951c&response_mode=fragment&sso_reload=true');
  await newPage.goto('https://www.microsoft.com/en-us/microsoft-teams/join-a-meeting');
//  await newPage.waitForSelector('input[id=i0116]');
 
//  await newPage.keyboard.type('sumit@antino.io', { delay: 20 });
//  await newPage.waitForSelector('input[id=idSIButton9]');
//  await newPage.focus('input[id=idSIButton9]')
//  await newPage.click('input[id=idSIButton9]')
//  await newPage.waitForTimeout(3000)
//  await newPage.waitForSelector('input[id=i0118]');
//  await newPage.keyboard.type('Shakya@123', { delay: 20 });
// 	await newPage.waitForSelector('input[id=idSIButton9]');
// 	   await newPage.focus('input[id=idSIButton9]')
// 	   await newPage.click('input[id=idSIButton9]')
// 	   await newPage.waitForTimeout(2000)
// 	   await newPage.waitForSelector('input[id=KmsiCheckboxField]');
// 	   await newPage.click('input[id=KmsiCheckboxField]')
// 	   await newPage.focus('input[id=idSIButton9]')
// 	   await newPage.click('input[id=idSIButton9]')
// 	   await newPage.waitForTimeout(20000)
// 	   await newPage.click('.tile-container')
	// idSIButton9
	// idSIButton9
	// i0118
  // console.log('turn off cam using Ctrl+E');
  await newPage.waitForTimeout(10000);
  await clickText(newPage, 'Switch to: India - English');
//   await newPage.waitForSelector('input[id=office-Hero5050-oputka3-InlineForm-0-TextField');
// //   const element = await newPage.$('#office-Hero5050-oputka3-InlineForm-0-TextField');
// // console.log("Input value",element); 

// // await newPage.$eval('input[id=office-Hero5050-oputka3-InlineForm-0-TextField]', el => el.value = '451 227 256 231');
await newPage.$eval('input[id=office-Hero5050-oputka3-InlineForm-0-TextField]', element => element.value = '478 012 607 551');

// // await newPage.waitForTimeout(1000);
// // await newPage.keyboard.press('KeyTab');
// // await newPage.waitForSelector('input[class=search]');
// // await clickText(newPage, 'Enter meeting ID');
// // await newPage.keyboard.type('451 227 256 231', { delay: 15 });

await newPage.waitForTimeout(2000);
await clickText(newPage, 'Enter meeting passcode');
await newPage.keyboard.type('DdEmNQ', { delay: 15 });
await newPage.waitForTimeout(3000);

await clickText(newPage, 'Join a meeting');
await newPage.waitForTimeout(2000);
const url = await newPage.url();
// //==============================================================================================
// const url = "https://teams.microsoft.com/l/meetup-join/19%3ameeting_NmRjOGZjMGQtY2YyMS00NTljLTkxNDYtOWMwODljMGFiZDE5%40thread.v2/0?context=%7b%22Tid%22%3a%2282cb77e5-b2fd-4c87-8739-2727d9a86da0%22%2c%22Oid%22%3a%220955bc2d-016a-4f44-a78a-2b2eb7a2ed0c%22%7d"
console.log("url   ====",url);
await newPage.goto(url)
await newPage.waitForTimeout(5000)
let newP = await browser.newPage();
// await newPage.close()
await newP.goto(url)
await newPage.waitForTimeout(4000)

const aa = await newP.waitForSelector('button[data-tid=joinOnWeb]');
await newP.click('button[data-tid=joinOnWeb]')
console.log(">>>>>>>>>>>>>>>>>>>>>",aa);
await newP.waitForTimeout(70000)
const ab = await newP.waitForSelector('#preJoinAudioButton');
await newP.click('#preJoinAudioButton')
await newP.waitForSelector('input[id=username]')
await newP.focus('input[id=username]')
// // await newP.$eval('input[id=username]', element => element.value = 'Sumit');
await newP.keyboard.type('LigthBulb', { delay: 15 });
await newP.waitForTimeout(5000)
await newP.keyboard.press('Tab');
await newP.waitForTimeout(1000)
await newP.keyboard.press('Enter');
console.log("Tab pressed");
//======================================================================================================
// const join = await newP.waitForSelector('button[class=join-btn ts-btn inset-border ts-btn-primary]')
// console.log("join>>>>>",join);
// await newP.click('.join-btn ts-btn inset-border ts-btn-primary')
//id=username, aria-label="Join the meeting"
// await clickText(newP, 'Couninue on this browser');
// Enter meeting passcode
// await page.waitForSelector('input[id=office-Hero5050-oputka3-InlineForm-1-TextField]');
// await newPage.$eval('input[id=office-Hero5050-oputka3-InlineForm-1-TextField]', el => el.value = '451 227 26 31');


// await newPage.keyboard.down('ControlLeft');
//   await newPage.keyboard.press('KeyE');
//   await newPage.keyboard.up('ControlLeft');
//   await newPage.waitForTimeout(100);

//   // console.log('turn off mic using Ctrl+D');
//   await newPage.waitForTimeout(1000);
//   await newPage.keyboard.down('ControlLeft');
//   await newPage.keyboard.press('KeyD');
//   await newPage.keyboard.up('ControlLeft');
//   await newPage.waitForTimeout(100);

// //   await newPage.keyboard.type('LigthBulb', { delay: 15 });

//   await clickText(newPage, 'Ask to join');
//   await clickText(newPage, 'Got it');

// setTimeout(async()=>{
// 	const p = await peopleInMeet(newPage)
// 	console.log("peoples====>>>>>>> ",p.length);
// },30000)
  
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
