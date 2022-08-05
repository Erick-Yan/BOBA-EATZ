const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const getReviews = async (url, shops, drinks) => {
  const browser = await puppeteer.launch({headless: false, args: ['--disabled-setuid-sandbox', '--no-sandbox']});
  const page = await browser.newPage();
  await page.goto(url);
  const data = [];
  for (let i = 0; i < shops.length; i++) {
    await searchShop 
  }
}

const searchShop = async (url, shops, drinks) => {

}

const test = async (url, shops, drinks) => {
  const browser = await puppeteer.launch({headless: false, args: ['--disabled-setuid-sandbox', '--no-sandbox']});
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector('#searchboxinput');
  await page.click('#searchboxinput');
  await page.$eval('#searchboxinput', (el, shops) => { el.value = shops[0] }, shops);
  await page.keyboard.press('Enter');

  await page.waitForSelector('.qBF1Pd');
  
  // click on first item
  await page.click('.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(5)');

  await page.waitForSelector('.pV4rW.q8YqMd');

  //click on search button
  await page.click('.pV4rW.q8YqMd');

  // search input
   await page.$eval('div.MrFZRe.g8q29e > div > input', (el, drinks) => { el.value = drinks[0] }, drinks);
   await page.keyboard.press('Enter');
   await page.waitForTimeout(1000);
   await page.click('.hWERUb');
   await page.waitForTimeout(1000);
   await page.click('.fKm1Mb');
   console.log('gud stuff');


//   await page.waitForSelector();

  // const data = await page.evaluate(() => {
  //     let reviewAuthorNamesClasses = document.getElementsByClassName('section-review-title');
  //     let reviewAuthorNames = [];
  //     for (let elements of reviewAuthorNamesClasses) {
  //         reviewAuthorNames.push(elements.innerText);
  //     }
  //     return {
  //         reviewAuthorNames
  //     }
  // })
  // browser.close();
  // return new Promise((resolve, reject) => {
  //     resolve(data);
  //     if(reject) {
  //         reject({error: "error while scraping data."})
  //     }
  // })

};

async function scrollPage(page, scrollContainer) {
    let lastHeight = await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight`);
    while (true) {
      await page.evaluate(`document.querySelector("${scrollContainer}").scrollTo(0, document.querySelector("${scrollContainer}").scrollHeight)`);
      await page.waitForTimeout(2000);
      let newHeight = await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight`);
      if (newHeight === lastHeight) {
        break;
      }
      lastHeight = newHeight;
    }
  }

// await scrollPage(page, '.DxyBCb');


module.exports = getReviews;