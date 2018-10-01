import { sql }               from '../db/db';
import { readShop, readCSV } from './shop'; 
import { insertCSV }         from './utils';

/**
 * @param {string} name
 * @description создает магазин.
 */
export async function createShop(name) {
  try {
    
    const { response, error} = await sql(
      `INSERT INTO t_shop (name, brief) 
          VALUES('${name}', '${name}') 
      ON CONFLICT (name) DO UPDATE SET upd_date = now() 
      RETURNING shop_id`
    );

    if (error) {
      throw error;
    }

    return response.shop_id;

  } catch (err) {
    console.log(err);
    return err.stack;
  }
}

/**
 * @description возвращает весь список магазинов.
 */
export async function getShops() {
  try {

    const { response, error } = await sql('SELECT json_agg(t) shops FROM (SELECT * from t_shop) t');

    if (error) {
      throw error;
    }
  
    return response;
    
  } catch (err) {
    return err.stack;
  }
}

/**
 * 
 * @param {string} shopName 
 * @param {string} productId 
 * @description возвращает итем из списка по названию и артикулу.
 */
export async function getItem(shopName, productId) {
  const query = `
  SELECT
    i.id,
    i.id as product_id,
    i.name,
    i.price,
    i.shop_id,
    s.name as shop_name

  FROM t_item i
  LEFT JOIN t_shop s on s.shop_id = i.shop_id
  WHERE s.name = '${shopName}' AND i.id = '${productId}'
  `;

  try {

    const { response, error } = await sql(query);

    if (error) {
      throw error;
    }

    return response;

  } catch (err) {
    return err.stack;
  }
};

/**
 * @param {number} id 
 * @description возвращает магазин
 */
export async function getShop(id) {
  try {
    
    const { response, error } = await sql(`SELECT * FROM t_shop WHERE shop_id = ${id}`);
    
    if (error) {
      throw error;
    }

    return response;

  } catch(err) {
    return err.stack;
  }
}


/**
 * @param {string} shopName 
 * @description запиысывает CSV в t_item
 */
export async function updateShop(shopName) {
  const shopConf = await readShop(shopName),
        csv      = await readCSV(shopConf);
  try {
    
    const { error } = await sql(insertCSV(csv));

    if (error) {
      throw error;
    }

    /**
     * @description для теста возвращаем весь список товаров.
     */
    return await sql(`
      SELECT json_agg(t) items 
      FROM (
        SELECT     
        i.id,
        i.id as product_id,
        i.name,
        i.price,
        i.shop_id,
        s.name as shop_name

      FROM t_item i 
      LEFT JOIN t_shop s on i.shop_id = s.shop_id
      ) t`);

  } catch (err) {
    return err.stack;
  }
};