const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const drinkName = ['3 Guys'];

const getReviews = async (url) => {
  const browser = await puppeteer.launch({args: ['--disabled-setuid-sandbox', '--no-sandbox']});
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation({waitUntil: "domcontentloaded"});
  await page.goto(url);
  await navigationPromise;
  await page.waitForSelector(".qBF1Pd");
  console.log('this worked');
  
  // click on first item
  await page.$x('//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[1]/div[3]/div/a').then( (elements) =>
  { elements[0].click() } );

  //click on search button
  await page.$x('//*[@id="QA0Szd"]/div/div/div[1]/div[3]/div/div[1]/div/div/div[2]/div[39]/div[1]/div[1]/div[2]/div/button/span').then( (elements) =>
  { elements[0].click() } );

  // search input
  await page.$eval('//*[@id="QA0Szd"]/div/div/div[1]/div[3]/div/div[1]/div/div/div[2]/div[39]/div[1]/div[2]/div/input', el => el.value = drinkName[0]);
  await page.keyboard.press('Enter');
  await page.waitForXPath('//*[@id="QA0Szd"]/div/div/div[1]/div[3]/div/div[1]/div/div/div[2]/div[9]/div[1]/div/div[3]/div[4]/jsl/button');

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
  browser.close();
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