const { Browser, newPage, executablePath } = require('puppeteer');
const puppeteer = require('puppeteer-extra');
const { existsSync } = require('fs');


const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { text } = require('express');
puppeteer.use(StealthPlugin());

exports.newBrowser = async () => {
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
			"--auto-select-tab-capture-source-by-title=meet",
			// "--auto-select-desktop-capture-source=Entire screen",
			'--start-maximized'
		],
		env: {
			LANG: 'en',
		},

		executablePath: executablePath(),

		// executablePath:'C:/Program Files/Google/Chrome/Application/Chrome.exe'

	};

	if (existsSync('/usr/bin/chromium-browser')) {
		console.log('Altering puppeteer chromium path...');
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
		.overridePermissions('https://lightbulb.tiiny.site/', [
			'microphone',
			'camera',
			'notifications',
		]);
	const page = await browser.newPage();
	// setTimeout()
	// await newPage.setViewport({ width: 1500, height: 768});

	//   await page.goto('http://127.0.0.1:5500/index.html');
	await page.goto('https://lightbulb.tiiny.site/');
	//   await page.waitForTimeout(3000)
	let newPage = await browser.newPage();


	await newPage.goto('https://meet.google.com/yqy-hqog-qum');
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

	// await newPage.waitForTimeout(10000)
	setTimeout(async() => {
		const element = await newPage.$(".uGOf1d");
		console.log('elements ---->  ',element);
		let text;
		const clrInt = setInterval(async () => {
			try {
				text = await newPage.evaluate(element => element.textContent, element);
				console.log('peoples====>>>>>>>', text);
				if (text == 1 || text == 'undefined') {
					clearInterval(clrInt)
					newPage.close()
					browser.close()
				}
			} catch (error) {
				console.log("error --> ",error);
				clearInterval(clrInt)
				newPage.close()
				browser.close()
			}
		}, 5000)
	}, 20 * 1000 * 1)
	// await newPage.waitForTimeout(11000)
	// console.log("after setinterval",text);
	// await newPage.waitForTimeout(15000)
	// console.log("after setinterval 2",text);

	// newPage.waitForTimeout(30000)

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

