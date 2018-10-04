import React            from 'react';
import PropTypes        from 'prop-types';
import { List, Label }  from 'semantic-ui-react';
import Shop             from './Shop';

const ShopList = ({ shops, openShop }) => (
  <List selection verticalAlign='middle'>
    <Label color='teal'>
      Список магазинов
      <Label.Detail>{shops.length}</Label.Detail>
    </Label>

    {shops.map(shop => <Shop  openShop={openShop} key={shop.shop_id} {...shop} /> )}

  </List>
);

ShopList.propTypes = {
  shops   : PropTypes.arrayOf(PropTypes.object).isRequired,
  openShop: PropTypes.func.isRequired     
}    

export default ShopList;
