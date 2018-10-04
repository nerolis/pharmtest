import express from 'express';

import { 
  getItem, 
  updateShop,
  getShops, 
  getShop 
} from './models';

const router = express.Router();
	
router.get('/shop/:shopName/:productId', async function (req, res) {
  const { shopName, productId } = req.params;
  const response = await getItem(shopName, productId);
  res.json(response);
});

router.post('/shop/:shopName', async function (req, res) {
  const { shopName } = req.params;
  const result = await updateShop(shopName);
  res.json(result);
}); 

router.get('/shop/:id', async function (req, res) {
  const { id } = req.params;
  const result = await getShop(id);
  res.json(result);
});


router.get('/shoplist', async function (req, res) {
  const result = await getShops();
  res.json(result);
});

export default router;
 