const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const placeUrl = 'https://www.google.com/maps/place/The+Alley/@43.5829699,-81.7470919,8z/data=!3m1!5s0x882b34b40fdfad6b:0x7cf5144b2a8e8b40!4m5!3m4!1s0x882b34b3d27c6bd1:0xbb48d009cd2be35b!8m2!3d43.6658!4d-79.3855494'

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

async function getReviewsFromPage(page) {
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
}

async function fillPlaceInfo(page) {
  const placeInfo = await page.evaluate(() => {
    return {
      title: document.querySelector(".DUwDvf").textContent.trim(),
      address: document.querySelector("button[data-item-id='address']")?.textContent.trim(), // data-item-id attribute may be different if the language is not English
      rating: document.querySelector("div.F7nice").textContent.trim(),
      reviews: document.querySelector("span.F7nice").textContent.trim().split(" ")[0],
    };
  });
  return placeInfo;
}

async function getLocalPlaceReviews() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(60000);
  await page.goto(placeUrl);
  await page.waitForSelector(".DUwDvf");

  const placeInfo = await fillPlaceInfo(page);

  await page.click(".mgr77e .DkEaL");
  await page.waitForTimeout(2000);
  await page.waitForSelector(".jftiEf");

  // await scrollPage(page, '.DxyBCb');

  const reviews = await getReviewsFromPage(page);

  await browser.close();

  return { placeInfo, reviews };
}

getLocalPlaceReviews().then(console.log);