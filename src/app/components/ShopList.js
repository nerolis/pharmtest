import React     from 'react';
import { List }  from 'semantic-ui-react';
import { Label } from 'semantic-ui-react'
import Shop      from './Shop';

const ShopList = ({ shops, openShop }) => (
  <List selection verticalAlign='middle'>

    <Label color="teal">
      Список магазинов
      <Label.Detail>{shops.length}</Label.Detail>
    </Label>

    {shops.map(shop => <Shop  openShop={openShop} key={shop.shop_id} {...shop} /> )}
    
  </List>
);

export default ShopList;
