import { sql }               from '../db/db';
import { readShop, readCSV } from './shop'; 

function multipleInsert(insert, rows) {
  const params = [],
        chunks = [];

  rows.forEach(row => {
    const valueClause = [];

    Object.keys(row).forEach(p => {
      params.push(row[p]);
      valueClause.push('$' + params.length);
    });

    chunks.push('(' + valueClause.join(', ') + ')');
  });

  return {
    text: insert + chunks.join(', ') + 'RETURNING *',
    values: params
  };
}

/**
 * 
 * @param {string} shopName 
 * @param {number} productId 
 */
export async function getShop(shopName, productId) {
  const query = `
  SELECT
    i.id,
    i.name,
    i.price,
    i.shop_name
    
  FROM t_items i
  WHERE i.shop_name = ${shopName} AND i.id = ${productId}
  `;

  return await sql(query);
};

/**
 * 
 * @param {string} shopName 
 */
export async function updateShop(shopName) {
  const shop     = await readShop(shopName),
        shopData = await readCSV(shop),
        keys     = Object.keys(shop.columns).map(key => key + shopName);
  return await sql(multipleInsert(`INSERT INTO t_item(${keys}) VALUES `, shopData, shop.name));
};