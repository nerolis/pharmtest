import React           from 'react';
import { connect }     from 'react-redux';
import PropTypes       from 'prop-types';
import history         from '../utils/history';
import ShopList        from '../components/ShopList';
import { fetchShops }  from '../actions/shop';

class Shop extends React.Component {

  componentWillMount = () => {
    if (!this.props.shops.length) {
      this.props.fetchShops();
    }
  };

  openShop = name => history.push(`/shop/${name}`);

    
  render() {
    const { shops } = this.props;

    return <ShopList openShop={this.openShop} shops={shops} />
  }
}

Shop.propTypes = {
  shops: PropTypes.arrayOf(PropTypes.object).isRequired       
}    

function mapStateToProps(state) {
    return {
     shops: state.shops,
    }
}

export default connect(mapStateToProps, { fetchShops })(Shop)