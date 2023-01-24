const { Browser, newPage,executablePath } =require('puppeteer');
// const puppeteer = require("puppeteer-stream");
const puppeteer = require('puppeteer-extra');
const { existsSync } = require('fs');
const fs = require('fs');

const file = fs.createWriteStream(__dirname + "/test.webm");

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
var stopped = false;
var shouldStop = false;
var mediaRecorder = null;
var UploadID = "";
var KeyResponse = "";
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
		executablePath:'C:/Program Files/Google/Chrome/Application/Chrome.exe'
        // executablePath: executablePath(),
		
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

		// browser
		// .defaultBrowserContext()
		// .overridePermissions('http://127.0.0.1:5500', [
		// 	'microphone',
		// 	'camera',
		// 	'notifications',
		// ]);
		// const page = await browser.newPage();

		let newPage = await browser.newPage();
		// const stream = await getStream(newPage, { audio: true, video: true });
	console.log("recording");
		await newPage.goto('https://meet.google.com/shc-anux-esa');
  
		await newPage.evaluate(async() => {
			const mimeType = "video/webm";
			shouldStop = false;
			const constraints = {
			  video: true,
			};
			const displayStream = await navigator.mediaDevices.getDisplayMedia({
				audio: true,
				video: true,
				systemAudio: "include",
			});
			let tracks = [
				...displayStream.getTracks(),
				//       ...voiceStream.getAudioTracks(),
			  ];
			  const stream = new MediaStream(tracks);
			//   handleRecordOriginal({ stream, mimeType });
			  var handleRecordOriginal = function ({ stream, mimeType }) {
				console.log("Handle Record Original");
				// to collect stream chunks
				let recordedChunks = [];
				stopped = false;
				if (mediaRecorder == null) mediaRecorder = new MediaRecorder(stream);
				mediaRecorder.ondataavailable = function (e) {
				  if (e.data.size > 0) {
					recordedChunks.push(e.data);
					console.log("Blob recorder", recordedChunks);
				  }
				};
				mediaRecorder.onstop = function () {
				  console.log("STOPPED");
				  const blob = new Blob(recordedChunks, {
					type: mimeType,
				  });
				  recordedChunks = [];
				  let recording = { blob: blob, startingTimestamp: "", duration: 0 };
				  //recordings.push(recording);
				  const filename = "LatestRec.mp4";
				  // downloadLink.href = URL.createObjectURL(blob); // create download link for the file
				  console.log("BLOB", URL.createObjectURL(blob));
				  // downloadLink.download = `${filename}.webm`; // naming the file with user provided name
				  // downloadLink.style.display = "block";
				  console.log("Download Link Ready", URL.createObjectURL(blob));
				  let recording_array = URL.createObjectURL(blob);
				  console.log("Recording Array", recording_array);
				  download(filename, recording_array);
				};
				mediaRecorder.start(200);
			  };
			  const stopRecording = () => {
				console.log("Triggered Stop Recording");
				mediaRecorder.stop();
			  };
			  function download(filename, text) {
				console.log("Download Called");
				var element = document.createElement("a");
				element.setAttribute("href", text);
				console.log("Element", element);
				element.setAttribute("download", filename);
				element.style.display = "none";
				document.body.appendChild(element);
				element.click();
				document.body.removeChild(element);
			  }
		});
		// await newPage.mouse.click(910, 50, {delay: 3000, button: 'right'});
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
