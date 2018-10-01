import fs             from 'fs';
import util           from 'util';
import axios          from 'axios';
import csv            from 'csvtojson';
import { createShop } from './models';

const path = './shops/';
const read = util.promisify(fs.readFile);

/**
 * 
 * @param {string} shopName
 * @description возвращает конфиг шопа. 
 */
export async function readShop(shopName) {
  try {

    const data = await read(path + shopName + '.json', 'utf8');

    return JSON.parse(data);

  } catch (err) {
    return err.stack;
  }
};


/**
 * @param {{csv_url: string, delimiter: string, columns: {any} }} shop 
 * @todo присваивать название магазина как-то иначе.
 */
export async function readCSV(shop) {
  const stream  = await downloadCSV(shop.csv_url);
  const shop_id = await createShop(shop.name);
  const options = {
    delimiter   : shop.delimiter,
    ignoreEmpty : true,
    colParser: {"price": "number"}
  };

  return new Promise((resolve, reject) => {
    let data = [];
    csv(options)
      .fromStream(stream)
      .subscribe(col => {
        const objectify = (obj, [k, v]) => ({ ...obj, [k]: col[v] });
        const rows = Object.entries(shop.columns).reduce(objectify, {});
        rows.shop_id = shop_id
        data.push(rows);
      })
      .on('done', () => resolve(data))
      .on('error', err => reject(err));
  });
};


/**
 * 
 * @param {string} url 
 * @description скачивает CSV
 * @returns CSV stream
 */
async function downloadCSV(url) {
  try {

    const response = await axios({
      method      : 'GET',
      url         : url,
      responseType: 'stream',
    });


    return response.data;
  } catch (err) {
    return err.stack;
  } 
}