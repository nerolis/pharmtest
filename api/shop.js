import fs           from 'fs';
import util         from 'util';
import axios        from 'axios';


const csv    = require('csvtojson');

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
    delimiter: shop.delimiter
  };

  return new Promise((resolve, reject) => {
    let data = [];
    csv(options)
      .fromStream(response.data)
      .subscribe(col => {
        if (col) {
          data.push(col);
        }
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