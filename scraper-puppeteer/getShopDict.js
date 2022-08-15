const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const getShopDict = async (url, shops) => {
  const browser = await puppeteer.launch({headless: false, args: ['--disabled-setuid-sandbox', '--no-sandbox', '--window-size=1200,900', '--disable-dev-shm-usage', '--shm-size=3gb']});
  const page = await browser.newPage();
  await page.goto(url);
  const shopDict = {}
  await Promise.all(
    shops.map( async (shop) => {
      shopDict[shop.name] = {};
      await searchShop(page, shop, shopDict);
    })
  );
  await browser.close();
  return shopDict;
};

const searchShop = async (page, shop, shopDict) => {
  await page.waitForSelector('#searchboxinput');
  await page.click('#searchboxinput');
  await page.$eval('#searchboxinput', (el, shop) => { el.value = shop.name }, shop);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.hfpxzc');
  // await scrollPage(page, '.ecceSd');
  const numberOfBranches = await page.evaluate( () => {
    return Array.from(document.querySelectorAll('.hfpxzc')).length;
  });
  for (let i = 0; i < numberOfBranches; i++) {
    await searchBranch(page, shop, i * 2 + 3, shopDict);
  }
};

const searchBranch = async (page, shop,  branchIndex, shopDict) => {
  await page.waitForSelector(`div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(${branchIndex}) > div > a`);
  await page.click(`div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(${branchIndex}) > div > a`);
  //click on search button
  await page.waitForSelector('.pV4rW.q8YqMd > div > button');
  await nativeClick(page, '.pV4rW.q8YqMd > div > button');
  await Promise.all(
    shop.drinks.map( async (drink) => {
      if ( !(drink in shopDict) ) {
        shopDict[shop.name][drink] = []
      }
      const addToDrinks = shopDict[shop.name][drink];
      const reviews = await getDrinkReviews(page, drink)
      addToDrinks.push.apply(reviews);
    })
  );
};

const getDrinkReviews = async (page, drink) => {
  await page.waitForSelector('div.MrFZRe.g8q29e > div > input');
  await page.$eval('div.MrFZRe.g8q29e > div > input', (el, drink) => { el.value = drink }, drink);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.BHymgf.eiJcBe > div > div > div:nth-child(1) > span > button');
  const reviews = await page.evaluate( async () => {
    return Array.from(document.querySelectorAll('.jftiEf')).map((el) => {
      return {
        reviewName: el.querySelector('.d4r55')?.textContent.trim(),
        reviewRating: parseFloat(el.querySelector('.kvMYJc')?.getAttribute('aria-label')),
        reviewDate: el.querySelector('.rsqaWe')?.textContent.trim(),
        reviewMessage: el.querySelector('.MyEned')?.textContent.trim(),
      };
    });
  });
  return reviews;
};

const nativeClick = async(page, selector) => {
  const button = await page.$(selector);
  await button.evaluate(b => b.click());
};

async function scrollPage(page, scrollContainer) {
  let lastHeight = await page.evaluate(`document.querySelector('${scrollContainer}').scrollHeight`);
  while (true) {
    await page.evaluate(`document.querySelector('${scrollContainer}').scrollTo(0, document.querySelector('${scrollContainer}').scrollHeight)`);
    await page.waitForTimeout(3000);
    let newHeight = await page.evaluate(`document.querySelector('${scrollContainer}').scrollHeight`);
    if (newHeight === lastHeight) {
      break;
    }
    lastHeight = newHeight;
  }
}

module.exports = getShopDict;