import { sql }               from '../db/db';
import { readShop, readCSV } from './shop'; 


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
    i.price
    
  FROM t_items i
  LEFT JOIN t_shops s on s.shop_id = i.shop_id
  WHERE s.shop_name = ${shopName} AND i.id = ${productId}
  `;

  return await sql(query);
};

/**
 * 
 * @param {string} shopName 
 */
export async function updateShop(shopName) {
  const shop     = await readShop(shopName);
  const shopData = await readCSV(shop);
  console.log(shopData);
};