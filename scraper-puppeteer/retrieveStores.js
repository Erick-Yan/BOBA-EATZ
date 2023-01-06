const shopData = require('../data/boba_shops.json');
const drinkData = require('../data/boba_drinks.json');

const retrieveStoresDict = () => {
    const shopDataList = shopData;
    let drinkDataList = drinkData;

    var storesDict = {};
    for(let i=0; i < drinkDataList.length; i++) {
        if(!(drinkDataList[i]["shopName"] in storesDict)) {
            storesDict[drinkDataList[i]["shopName"]] = {
                name: drinkDataList[i]["shopName"].split(" - ")[0],
                drinks: []
            }
        }
        storesDict[drinkDataList[i]["shopName"]].drinks.push(drinkDataList[i]["drinkName"]);
    }

    var ret = [];
    for(var key in storesDict) {
        console.log(storesDict[key].drinks.length);
        if(storesDict[key].drinks.length <= 500) {
            ret.push(storesDict[key]);
        }
    }

    console.log(ret);

    return ret;
}

//retrieveStoresDict();

module.exports = retrieveStoresDict;