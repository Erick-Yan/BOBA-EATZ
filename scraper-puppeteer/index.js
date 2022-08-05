const getReviews = require('./getReviews');

const drinkName = ['3 Guys']

async function main() {
  try {
      const data = await getReviews("https://www.google.com/maps/place/CoCo+Fresh+Tea+%26+Juice/@43.6645497,-79.4804115,13z/data=!4m11!1m2!2m1!1sCoCo+Fresh+Tea+%26+Juice!3m7!1s0x882b34c16405e5f7:0x351b8b5bfc478cde!8m2!3d43.6558464!4d-79.3988998!9m1!1b1!15sChZDb0NvIEZyZXNoIFRlYSAmIEp1aWNlIgOIAQFaGCIWY29jbyBmcmVzaCB0ZWEgJiBqdWljZZIBEGJ1YmJsZV90ZWFfc3RvcmWaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTXdhaTFZZFdwUlJSQUI");
      console.log(JSON.stringify(data));
  } catch(e) {
      console.log(e);
  }
}

main();