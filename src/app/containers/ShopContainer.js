import React           from 'react';
import { connect }     from 'react-redux';
import PropTypes       from 'prop-types';
import history         from '../utils/history';
import ShopList        from '../components/ShopList';
import { fetchShops }  from '../actions/shop';

class ShopContainer extends React.Component {

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

ShopContainer.propTypes = {
  shops: PropTypes.arrayOf(PropTypes.object).isRequired,
  openShop: PropTypes.func.isRequired     
}    

function mapStateToProps(state) {
    return {
     shops: state.shops,
    }
}

export default connect(mapStateToProps, { fetchShops })(ShopContainer)