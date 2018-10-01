import React           from 'react'
import { List }        from 'semantic-ui-react'
import PropTypes       from 'prop-types';

const Shop = ({ brief, name, shop_id, openShop }) => (
    <List.Item onClick={() => openShop(name)}>
        <List.Content>
        <List.Header>{name}</List.Header>
        </List.Content>
    </List.Item>
);

export default Shop;