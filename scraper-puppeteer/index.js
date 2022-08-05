const getReviews = require('./getReviews');

async function main() {
  try {
      const data = await getReviews("https://www.google.com/maps/search/CoCo+Fresh+Tea+%26+Juice/@43.6645497,-79.4804115,13z");
      console.log(JSON.stringify(data));
  } catch(e) {
      console.log(e);
  }
}

main();