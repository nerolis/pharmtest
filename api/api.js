import express                  from 'express';
import { getShop, updateShop }  from './models';

const router = express.Router();
	
router.get('/shop/:shopName/:productId', async function (req, res) {
  const { shopName, productId } = req.params;
  const response = await getShop(shopName, productId);
  res.json(response);
});

router.post('/shop/:shopName', async function (req, res) {
  const { shopName } = req.params;
  const result = await updateShop(shopName);
  res.json(result);
}); 

export default router;
 