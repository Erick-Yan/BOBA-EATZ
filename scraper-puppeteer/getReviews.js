const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const getReviews = async (url, shops) => {
  const browser = await puppeteer.launch({headless: false, args: ['--disabled-setuid-sandbox', '--no-sandbox', '--window-size=900,900']});
  const page = await browser.newPage();
  await page.goto(url);
  const data = [];
  shops.map( async (item) => await searchShop(page, item));
};

const searchShop = async (page, shop) => {
  await page.waitForSelector('#searchboxinput');
  await page.click('#searchboxinput');
  await page.$eval('#searchboxinput', (el, shop) => { el.value = shop.name }, shop);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.hfpxzc');
  const numberOfBranches = await page.evaluate( async () => {
    return Array.from(document.querySelectorAll('.hfpxzc')).length;
  });
  for (let i = 0; i < numberOfBranches; i++) {
    await searchBranch(page, shop, i * 2 + 3);
  }
}
const searchBranch = async (page, shop,  branchIndex) => {
  await page.waitForSelector(`div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(${branchIndex}) > div > a`);
  await page.click(`div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(${branchIndex}) > div > a`);
  shop.drinks.map( async (drink) => {
    await searchDrink(page, drink);
  });
  await page.waitForTimeout(5000);
  await page.waitForSelector('div.fKm1Mb > button');
  await nativeClick(page, 'div.fKm1Mb > button');

  // await page.click('div.fKm1Mb > button');
};

const searchDrink = async (page, drink) => {
  //click on search button
  await page.waitForSelector('.pV4rW.q8YqMd > div > button');
  await nativeClick(page, '.pV4rW.q8YqMd > div > button');
  // search input
  await page.waitForSelector('div.MrFZRe.g8q29e > div > input');
  await page.$eval('div.MrFZRe.g8q29e > div > input', (el, drink) => { el.value = drink }, drink);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000);
  await page.waitForSelector('div.hWERUb > button');
  await nativeClick(page, 'div.hWERUb > button');

  // await page.click('div.hWERUb > button');
};

const getDrinkReviews = async () => {
};


const nativeClick = async(page, selector) => {
  const button = await page.$(selector);
  await button.evaluate(b => b.click());
};

async function scrollPage(page, scrollContainer) {
    let lastHeight = await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight`);
    while (true) {
      await page.evaluate(`document.querySelector("${scrollContainer}").scrollTo(0, document.querySelector("${scrollContainer}").scrollHeight)`);
      await page.waitForTimeout(3000);
      let newHeight = await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight`);
      if (newHeight === lastHeight) {
        break;
      }
      lastHeight = newHeight;
    }
  }

// await scrollPage(page, '.DxyBCb');


module.exports = getReviews;