const getShopDict = require('./scrapeGMaps');
const retrieveStores = require('./retrieveStores');
const fs = require('fs');

async function main() {
  try {
      const shops = await retrieveStores();
      const data = await getShopDict('https://www.google.com/maps/@43.6764672,-79.3935872,12z', shops);
      var dataJSON = JSON.stringify(data);
      // console.log(dataJSON);
      console.log("Arrived");
      fs.readFile('data.json', 'utf8', function (err, data) {
        fs.writeFile('data.json', dataJSON, function(err, result) {
          if(err) console.log('error', err);
        });
      });
  } catch(e) {
      console.log(e);
  }
}

main();