import fs           from 'fs';
import util         from 'util';
import axios        from 'axios';
import csv          from 'csvtojson';

const path = './shops/';
const read = util.promisify(fs.readFile);

/**
* @param {string} shopName 
*/
export async function readShop(shopName) {
  try {

    const data = await read(path + shopName + '.json', 'utf8');
    return JSON.parse(data);

  } catch (err) {
    console.log(err);
  }
};


/**
 * @param {{}} shop 
 */
export async function readCSV(shop) {
  const response = await downloadCSV(shop.csv_url);

  const options = {
    delimiter   : shop.delimiter,
    ignoreEmpty : true,
  };

  return new Promise((resolve, reject) => {
    let data = [];
    csv(options)
      .fromStream(response.data)
      .subscribe(col => {
        const objectify = (obj, [k, v]) => ({ ...obj, [k]: col[v] });
        const rows = Object.entries(shop.columns).reduce(objectify, {});
        data.push(rows);
      })
      .on('done', () => resolve(data))
      .on('error', err => reject(err));
  });
};


/**
 * 
 * @param {string} url 
 */
async function downloadCSV(url) {
  try {

    return await axios({
      method      : 'GET',
      url         : url,
      responseType: 'stream'
    });

  } catch (err) {
    console.log(err);
  } 
}