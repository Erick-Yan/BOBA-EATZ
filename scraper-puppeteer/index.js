const getReviews = require('./getReviews');

async function main() {
  const shops = [
    {
      name: 'CoCo Fresh Tea & Juice',
      drinks: ['3 Guys']
    }
  ];
  try {
      const data = await getReviews('https://www.google.com/maps/@43.6764672,-79.3935872,12z', shops);
      // console.log(JSON.stringify(data));
  } catch(e) {
      console.log(e);
  }
}

main();