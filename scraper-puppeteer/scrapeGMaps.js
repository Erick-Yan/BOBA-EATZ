const puppeteer = require('puppeteer-extra');
const bluebird = require("bluebird");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const locateChrome = require("locate-chrome");

puppeteer.use(StealthPlugin());

const browserFn = async (fn) => {
  const executablePath = await new Promise(resolve => locateChrome(arg => resolve(arg)));
  const browser = await puppeteer.launch({
    headless: false, 
    args: ['--disable-setuid-sandbox', 
            '--no-sandbox', 
            '--window-size=1920,1080'
          ],
    executablePath: executablePath
    }
  );
  try {
    return await fn(browser);
  } finally {
    await browser.close();
  }
}

const pageFn = (browser) => async (fn) => {
  const page = await browser.newPage();
	try {
		return await fn(page);
	} finally {
		await page.close();
  }
}

const getShopDict = async (url, shops) => {
  let shopDict = {}
  await bluebird.map(shops, async (shop) => {
    return browserFn(async (browser) => {
      return pageFn(browser)(async (page) => {
        try {
          await page.setDefaultNavigationTimeout(60000);
          await page.goto(url);
          shopDict[shop.name] = {};
          await searchShop(page, shop, shopDict);
        } catch (error) {
          console.log(`----> {Failed: ${shop.name}, Reason: ${error}} <----`);
        }
      });
    });
  }, {concurrency: 3});
  return shopDict;
};

const searchShop = async (page, shop, shopDict) => {
  await page.waitForSelector('#searchboxinput');
  await page.click('#searchboxinput');
  await page.$eval('#searchboxinput', (el, shop) => { el.value = shop.name }, shop);
  // await page.keyboard.press('Enter');
  await nativeClick(page, '.pzfvzf > button');
  await page.waitForSelector('.hfpxzc');
  // await scrollPage(page, '.ecceSd');
  const numberOfBranches = await page.evaluate( () => {
    return Array.from(document.querySelectorAll('.hfpxzc')).length;
  });
  for (let i = 0; i < numberOfBranches; i++) {
    await searchBranch(page, shop, i * 2 + 3, shopDict);
  }

  return shopDict;
};

const searchBranch = async (page, shop,  branchIndex, shopDict) => {
  await scrollPage(page, 'div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(1)');
  // Flaky: div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(${branchIndex}) > div > a
  // Doesn't always click on the next branch...
  await page.waitForSelector(`div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(${branchIndex}) > div > a`);
  await page.click(`div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(${branchIndex}) > div > a`);
  console.log("Clicked Once...");
  await page.click(`div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(${branchIndex}) > div > a`);
  console.log("Clicked Twice...");
  await page.click(`div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(${branchIndex}) > div > a`);
  console.log(`Clicked Thrice...${shop.name}`);
  //click on search button
  await page.waitForSelector('.Io6YTe');
  await scrollPage(page, '.Io6YTe');
  for (let i = 0; i < shop.drinks.length; i++) {
    if (!(shop.drinks[i] in shopDict[shop.name])) {
      shopDict[shop.name][shop.drinks[i]] = []
    }
    //console.log(shop.name);
    const retrieved_reviews = await getDrinkReviews(page, shop.drinks[i]);
    Array.prototype.push.apply(shopDict[shop.name][shop.drinks[i]], retrieved_reviews);
    //console.log(shopDict[shop.name][shop.drinks[i]].length);
  }
  return shopDict;
};

const getDrinkReviews = async (page, drink) => {
  //console.log(drink);
  await page.waitForSelector('.pV4rW.q8YqMd > div > button');
  await nativeClick(page, '.pV4rW.q8YqMd > div > button');
  await page.waitForSelector('div.MrFZRe.g8q29e > div > input');
  await page.$eval('div.MrFZRe.g8q29e > div > input', (el, drink) => { el.value = drink }, drink);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.BHymgf.eiJcBe > div > div > div:nth-child(1) > span > button');
  await page.waitForTimeout(2000);
  await page.evaluate(() => !document.querySelectorAll('.IXJj5c', {display: true}));
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
  //console.log(reviews.length);
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