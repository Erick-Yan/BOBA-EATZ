const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const getReviews = async (url, shops) => {
  const browser = await puppeteer.launch({headless: false, args: ['--disabled-setuid-sandbox', '--no-sandbox', '--window-size=1200,900']});
  const page = await browser.newPage();
  await page.goto(url);
  await shops.map( async (item) => {
   await searchShop(page, item);
    // return reviews;
  });
  // await browser.close();
  // return data;
};

const searchShop = async (page, shop) => {
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
    await searchBranch(page, shop, i * 2 + 3);
    console.log('branch', i);
  }
};

const searchBranch = async (page, shop,  branchIndex) => {
  await page.waitForSelector(`div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(${branchIndex}) > div > a`);
  await page.click(`div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div:nth-child(${branchIndex}) > div > a`);
  await page.waitForTimeout(1000);

  //click on search button
  await page.waitForSelector('.pV4rW.q8YqMd > div > button');
  await nativeClick(page, '.pV4rW.q8YqMd > div > button');
  shop.drinks.map( async (drink) => {
    await searchDrink(page, drink);
  });
};

const searchDrink = async (page, drink) => {
  // search input
  await page.waitForSelector('div.MrFZRe.g8q29e > div > input');
  await page.$eval('div.MrFZRe.g8q29e > div > input', (el, drink) => { el.value = drink }, drink);
  await page.keyboard.press('Enter');
  console.log(drink);
  const drinkReviews = await getDrinkReviews(page);
  console.log(drinkReviews);
  // const drinkObject = {
  //   drinkName: drink,
  //   reviews: drinkReviews
  // }
  // return drinkObject;
  // await page.waitForSelector('div.bJzME.Hu9e2e.tTVLSc');
  // await scrollPage(page, 'div.bJzME.Hu9e2e.tTVLSc');
};

const getDrinkReviews = async (page) => {
  const reviews = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".jftiEf")).map((el) => {
      return {
        user: {
          name: el.querySelector(".d4r55")?.textContent.trim(),
          link: el.querySelector(".WNxzHc a")?.getAttribute("href"),
          thumbnail: el.querySelector(".NBa7we")?.getAttribute("src"),
          localGuide: el.querySelector(".RfnDt span:first-child").style.display === "none" ? undefined : true,
          reviews: parseInt(el.querySelector(".RfnDt span:last-child")?.textContent.replace("·", "")),
        },
        rating: parseFloat(el.querySelector(".kvMYJc")?.getAttribute("aria-label")),
        date: el.querySelector(".rsqaWe")?.textContent.trim(),
        snippet: el.querySelector(".MyEned")?.textContent.trim(),
        likes: parseFloat(el.querySelector(".GBkF3d:nth-child(2)")?.getAttribute("aria-label")),
        images: Array.from(el.querySelectorAll(".KtCyie button")).length
          ? Array.from(el.querySelectorAll(".KtCyie button")).map((el) => {
              return {
                thumbnail: getComputedStyle(el).backgroundImage.slice(5, -2),
              };
            })
          : undefined,
        date: el.querySelector(".rsqaWe")?.textContent.trim(),
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

module.exports = getReviews;