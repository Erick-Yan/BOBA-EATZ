const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const getReviews = async (url) => {
  const browser = await puppeteer.launch({headless: true, args: ['--disabled-setuid-sandbox', '--no-sandbox']});
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('.qBF1Pd');
  
  // click on first item
  await page.click('#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(3) > div > a');

  await page.waitForSelector('.q8YqMd');

  //click on search button
  await page.click('#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.Pf6ghf.KoSBEe.ecceSd.tLjsW > div.i7mKJb.fontBodyMedium > div.m3rned > div.pV4rW.q8YqMd > div > button');

  // search input
   await page.$eval('#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.Pf6ghf.KoSBEe.ecceSd.tLjsW > div.i7mKJb.fontBodyMedium.zzWGUd > div.MrFZRe.g8q29e > div > input', el => el.value = '3 Guys');
   await page.keyboard.press('Enter');
   await page.waitForTimeout(1000);
   await page.click('#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.BHymgf.eiJcBe > div > div > div.hWERUb > span > button');
   await page.waitForTimeout(1000);
   await page.click('#omnibox-singlebox > div.NaMBUd.omnibox-active > div.fKm1Mb > button');
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