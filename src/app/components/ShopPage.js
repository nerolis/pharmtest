import React     from 'react';
import PropTypes from 'prop-types';

const Shop = ({ name, openShop }) => (
    <List.Item onClick={() => openShop(name)}>
        <List.Content>
        <List.Header>{name}</List.Header>
        </List.Content>
    </List.Item>
);

Shop.propTypes = {
    shop: PropTypes.shape({ name: PropTypes.string}),
    openShop: PropTypes.func.isRequired
};

export default Shop;