import _                              from 'lodash';
import React, { Component }           from 'react';
import PropTypes                      from 'prop-types';
import { Search, Grid, Header, List } from 'semantic-ui-react';
import { fetchItem }                  from '../actions/item';
import { connect }                    from 'react-redux';


class SearchItem extends Component {

  componentWillMount = () => this.resetComponent();

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  resultRenderer = ({id, product_id, name, price}) => (
      <List key={id}>
        <List.Item>id: {product_id}</List.Item>
        <List.Item>name: {name}</List.Item>
        <List.Item>price: {price}</List.Item>
      </List>
  ); 

  handleSearchChange = (e, { value }) => {
    const { name } = this.props.match.params;

    this.setState({ isLoading: true, value });

    this.props.fetchItem(name, value);

    setTimeout(() => {
      this.setState({
        isLoading: false,
        results: this.props.items,
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Grid>
        <Header size='large'>{this.props.match.params.name}</Header>
        <Grid.Column width={6}>
          <Search
            size='massive'
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            resultRenderer={this.resultRenderer}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

SearchItem.propTypes = {
  fetchItem: PropTypes.func.isRequired     
}    

function mapStateToProps(state) {
  return {
   items: state.items,
  }
}

export default connect(mapStateToProps, { fetchItem })(SearchItem)