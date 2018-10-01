/**
 * @param {[{id: string, name: string, price: number, shop_name: string }]} rows 
 * @todo onconflict = update
 */
export function insertCSV(rows) {
  const params = [],
        chunks = [],
        keys   = Object.keys(...rows).map(i => i);
  
  rows.forEach(row => {
    const valueClause = [];
  
    Object.keys(row).forEach(p => {
      params.push(row[p]);
      valueClause.push('$' + params.length);
    });
  
    chunks.push('(' + valueClause.join(', ') + ')');
  });
  
  return {
    text: ` INSERT INTO t_item(${keys}) VALUES ` + chunks.join(', ') + 'RETURNING *',
    values: params
  };
}