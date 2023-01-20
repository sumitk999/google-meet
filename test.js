const { launch, getStream } = require('puppeteer-stream')
const StealthPlugin = require('puppeteer-stream-stealth-mode')
const delay = require('delay');
// const puppeteer = require('puppeteer-stream')

const { executablePath, } = require('puppeteer')
const fs = require("fs")

const puppeteer = require('puppeteer-extra');
const { existsSync } = require('fs');

// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin);

const file = fs.createWriteStream(__dirname + "/abc.mp4")

async function test() {
    const browser = await puppeteer.launch({
        headless:false,
        // defaultViewport: {
        //     width: 1900,
        //     height: 1000
        // },
        args: ['--start-maximized',
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream',
        ],
        // executablePath: executablePath(),
        executablePath: 'C:/Program Files/Google/Chrome/Application/Chrome.exe'
    })
    let newPage = await browser.newPage();
    const url = "https://teams.microsoft.com/l/meetup-join/19%3ameeting_NWI1NDlhMTYtNDc3Ni00ZDM1LWE2NzAtNWRjOTMzYTdhYThl%40thread.v2/0?context=%7b%22Tid%22%3a%2282cb77e5-b2fd-4c87-8739-2727d9a86da0%22%2c%22Oid%22%3a%22135e2a95-ffe0-4a60-8e6b-0684ffdded7c%22%7d"
    // console.log("url   ====",url);
    await newPage.goto("https://teams.microsoft.com/l/meetup-join/19%3ameeting_NWI1NDlhMTYtNDc3Ni00ZDM1LWE2NzAtNWRjOTMzYTdhYThl%40thread.v2/0?context=%7b%22Tid%22%3a%2282cb77e5-b2fd-4c87-8739-2727d9a86da0%22%2c%22Oid%22%3a%22135e2a95-ffe0-4a60-8e6b-0684ffdded7c%22%7d")
    await newPage.waitForTimeout(3000)
    await delay(3000)
    let newPa = await browser.newPage();
    await newPa.goto(url,{waitUntil:"load"})
    await delay(3000)
    let newPb = await browser.newPage();
    const stream = await getStream(newPb, { audio: true, video: true })
    await newPb.goto(url,{waitUntil:"load"})
    await delay(3000)
    let newP = await browser.newPage();
    // await newPage.mouse.click(910, 50, {delay: 3000, button: 'left'});
    // newPage.close()
    // await page.waitForTimeout(30000/)
    // const stream = await getStream(page,{audio:true,video:true})
    console.log("recording called");
    // const stream = await getStream(newP, { audio: true, video: true })
    await newP.goto(url)
    // const stream = await getStream(newP, { audio: true, video: true });
    console.log("recording started");
    // console.log("recording");
    // stream.pipe(file);
    await newPage.waitForTimeout(2000)

    const aa = await newP.waitForSelector('button[data-tid=joinOnWeb]');
    await newP.click('button[data-tid=joinOnWeb]')
    console.log(">>>>>>>>>>>>>>>>>>>>>", aa);
    await newP.waitForTimeout(10000)
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

    stream.pipe(file)
    setTimeout(async () => {
        await stream.destroy()
        file.close()
        console.log("Ended");
    }, 90000)
}
test()
