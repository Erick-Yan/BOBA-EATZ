const puppeteer  = require('puppeteer');

const getReviews = async (url) => {
  const browser = await puppeteer.launch({args: ['--disabled-setuid-sandbox', '--no-sandbox']});
  const page = await browser.newPage();
  await page.goto(url);
  console.log(page.url);
  await page.waitForSelector('.section-review-text');
  const data = await page.evaluate(() => {
      let reviewAuthorNamesClasses = document.getElementsByClassName('section-review-title');
      let reviewAuthorNames = [];
      for (let elements of reviewAuthorNamesClasses) {
          reviewAuthorNames.push(elements.innerText);
      }
      let datesClasses = document.getElementsByClassName('section-review-publish-date');
      let dates = [];
      for(let elements of datesClasses) {
          dates.push(elements.innerText);
      }

      let ratingsClasses = document.getElementsByClassName('section-review-stars');
      let ratings = [];
      for (let elements of ratingsClasses) {
          ratings.push(elements.children.length);
      }

      let reviewsContentClasses = document.getElementsByClassName('section-review-text');
      let reviewsContent = []
      for(let elements of reviewsContentClasses) {
          reviewsContent.push(elements.innerText);
      }
      return {
          reviewAuthorNames,
          dates,
          ratings,
          reviewsContent
      }
  })
  browser.close();
  return new Promise((resolve, reject) => {
      resolve(data);
      if(reject) {
          reject({error: "error while scraping data."})
      }
  })

};
//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[9]/div[13]

module.exports = getReviews;