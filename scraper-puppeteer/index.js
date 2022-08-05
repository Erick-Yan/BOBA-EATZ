const getReviews = require('./getReviews');

async function main() {
  const shops = ['CoCo Fresh Tea & Juice'];
  const drinks = ['3 Guys'];
  try {
      const data = await getReviews('https://www.google.com/maps/', shops, drinks);
      console.log(JSON.stringify(data));
  } catch(e) {
      console.log(e);
  }
}

main();