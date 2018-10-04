import React         from 'react';
import { Route }     from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import SearchItem      from './components/SearchItem';
import Shops           from './containers/ShopContainer';

class App extends React.Component {

  render() {

    const { location }  = this.props;
    
    const contentStyles = {marginTop: '50px'}

    return (
      <Container style={contentStyles}>
        <Route location={location} path='/' exact component={Shops} />
        <Route location={location} path='/shop/:name' exact component={SearchItem} />
      </Container>
    );
  }
}

export default App;