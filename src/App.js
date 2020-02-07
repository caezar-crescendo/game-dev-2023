import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.scss';

function App() {

  class ItemList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: props.items,
        filtered: null,
      };
    }

    render() {
      console.log('ItemList filtered: ', this.props.filtered);
      let rows = [];
      let data = this.props.filtered.length ? this.props.filtered : this.state.items;
      for (let i = 0; i < data.length; i++) {
        rows.push(
          <div key={i}>{data[i]}</div>
        );
      }
      return rows;
    }
  }

  class TabOne extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tabOneItems: [],
        filteredList: [],
      };
    }

    onSearchSubmit() {
      let searchTextEl = document.querySelector('.input-search');
      let filteredList;
      if (searchTextEl && searchTextEl.value) {
        filteredList = this.state.tabOneItems.filter((e) => e.includes(searchTextEl.value));
        console.log('onSearchSubmit: ', filteredList);
        this.state.filteredList = filteredList;
        this.setState({filteredList: filteredList});
        return false;
      }
      this.state.filteredList = this.state.tabOneItems;
      this.setState({filteredList: this.state.tabOneItems});
      return false;
    }

    onSubmitAddToList(e) {
      e.preventDefault();
      let item = document.querySelector('.input-text');
      if (item && item.value) {
        this.state.tabOneItems.unshift(item.value);
        item.value = '';
        console.log('this.state.tabOneItems: ', this.state.tabOneItems);
        this.setState({tabOneItems: this.state.tabOneItems});
        console.log('onSubmitAddToList', this.state.tabOneItems);
      }
    }

    renderItems() {
      console.log('renderItems this.state.filteredList: ', this.state.filteredList);
      return (
        <ItemList filtered={this.state.filteredList} items={this.state.tabOneItems}/>
      )
    }

    render() {
      console.log('re-rendered tab one');
      return (
        <div>
          <div className="input-panel">
            <div>
              <div>
                <form className="form-add-item" onSubmit={(e) => this.onSubmitAddToList(e)}>
                  <input type="text" className="input-text"/>
                  <button type="submit" className="btn-add">Add Item</button>
                </form>
              </div>
            </div>
            <div>
              <input type="text" onChange={() => this.onSearchSubmit()} className="input-search" name="searchString"/>
            </div>
          </div>
          <div className="list-panel">
            {this.renderItems()}
          </div>
        </div>
      )
    }
  }

  return (
    <div className="app">
      <Router>
        <div className="header-nav">
          <Link to="/tab-one"><div>tab 1</div></Link>
          <Link to="/tab-two"><div>tab 2</div></Link>
        </div>
        <div className="body">
          <Switch>
            <Route path="/tab-one">
              <TabOne/>
            </Route>
            <Route path="/tab-two">
              <div className="tab-two">
                This is tab 2 view
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
