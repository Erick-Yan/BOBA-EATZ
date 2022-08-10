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
    // return reviews;
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
      const reviews = await getDrinkReviews(page, drink);
      const addToDrinks = shopDict[shop.name][drink]
      addToDrinks.push.apply(reviews)
    })
  );
};

// #QA0Szd > div > div > div.w6VYqd > div.bJzME.Hu9e2e.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf > div:nth-child(9) > div:nth-child(1)

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


// [
//   {
//     'reviewerName': 'Yunny H.',
//     'reviewRating': 4.0,
//     'reviewDate': '11\/30\/2019',
//     'reviewMessage': 'We tried out Chatime's new Pistachio Mustachio winter special drink. It was a pistachio matcha latte topped with sea salt crema. It doesn't come with pearls but my added extra pearls as a topping.But the pistachio flavour is too subtle and light that I can barely taste it... kind of disappointed. My all time favourite drink is still the Brown Sugar Roasted Milk Tea Pistachio Mustachio Brown Sugar Roasted Milk Tea',
//     '_id': {
//       '$oid': 'b5e3d071009611eda2b8d0ab'
//     },
//     'drinkId': {
//       '$oid': 'b50ef315009611ed9159d0ab'
//     }
//   },
// ]



// [
//   {
//     '_id': {
//       '$oid': 'b07d5cb4009611edbd66d0ab'
//     },
//     'shopName': 'Chatime - Dundas',
//     'shopImage': 'https:\/\/s3-media0.fl.yelpcdn.com\/bphoto\/zwRbWHdciL1zCiaWCgkZqA\/348s.jpg',
//     'avgRating': 3.5,
//     'shopAddress': '132 Dundas Street W Toronto, ON M5G 1C3',
//     'drinks': [
//       {
//         '$oid': 'b50ef315009611ed9159d0ab'
//       },
//       {
//         '$oid': 'b9c251dd009611eda86dd0ab'
//       },
//       {
//         '$oid': 'bcbfc7dc009611edba90d0ab'
//       },
//       {
//         '$oid': 'bddd2ccd009611ed9fb7d0ab'
//       },
//       {
//         '$oid': 'becb682e009611edb267d0ab'
//       },
//       {
//         '$oid': 'c0370803009611ed8572d0ab'
//       },
//       {
//         '$oid': 'c2121bcb009611ed98b0d0ab'
//       },
//       {
//         '$oid': 'c394154c009611edbccfd0ab'
//       },
//       {
//         '$oid': 'c4da324f009611ed8772d0ab'
//       },
//       {
//         '$oid': 'c5dfffd5009611ed8e5dd0ab'
//       }
//     ]
//   },
// ]


// [
//   {
//     '_id': {
//       '$oid': 'b50ef315009611ed9159d0ab'
//     },
//     'drinkName': 'Roasted Milk Tea',
//     'drinkImage': 'https:\/\/s3-media0.fl.yelpcdn.com\/bphoto\/HrWnzPo2Xu2cZdxJDV2NRA\/o.jpg',
//     'avgRating': 3.6,
//     'reviews': [
//       {
//         '$oid': 'b5e3d071009611eda2b8d0ab'
//       },
//       {
//         '$oid': 'b62c97e1009611ed8cf0d0ab'
//       },
//       {
//         '$oid': 'b6711d81009611eda9b4d0ab'
//       },
//       {
//         '$oid': 'b6ba5f5b009611edb50cd0ab'
//       },
//       {
//         '$oid': 'b7148cf4009611ed9677d0ab'
//       },
//       {
//         '$oid': 'b76482d0009611eda7d0d0ab'
//       },
//       {
//         '$oid': 'b79b714a009611edaae2d0ab'
//       },
//       {
//         '$oid': 'b7d59418009611eda6b0d0ab'
//       },
//       {
//         '$oid': 'b80cd099009611edb7dfd0ab'
//       },
//       {
//         '$oid': 'b84bd46a009611eda64dd0ab'
//       },
//       {
//         '$oid': 'b89fc9bc009611edac3bd0ab'
//       },
//       {
//         '$oid': 'b8e907eb009611ed882cd0ab'
//       },
//       {
//         '$oid': 'b9355327009611edac06d0ab'
//       },
//       {
//         '$oid': 'b964a19a009611ed82ded0ab'
//       },
//       {
//         '$oid': 'b99414c8009611ed80a7d0ab'
//       }
//     ],
//     'shopId': {
//       '$oid': 'b07d5cb4009611edbd66d0ab'
//     },
//     'shopName': 'Chatime - Dundas'
//   },
// ]