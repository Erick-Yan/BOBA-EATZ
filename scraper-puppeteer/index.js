const getReviews = require('./getReviews');

async function main() {
  const shops = [
    {
      name: 'CoCo Fresh Tea & Juice',
      drinks: ['3 Guys', 'Pearl Milk Tea', '2 Ladies', 'Red Bean Matcha Milk Tea', 'Sago Taro Milk Tea']
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