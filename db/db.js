import { Pool } from 'pg';

const pool = new Pool({
  database: 'test',
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
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
