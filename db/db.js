import { Pool } from 'pg';
import { debug } from 'util';

const pool = new Pool({
  database: 'test',
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', (conn) => {
  conn.on('notice', (msg) => {
    console.log(msg);
  });
});

	
export async function sql(text, params) {
  try {

    const resp = await pool.query(text, params);

    return {
      response: resp.rows[0]
    };
  }
  catch (err) {
    return {
      error: err
    };
  }
}