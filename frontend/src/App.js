import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LandingPage from './components/Pages/LandingPage';
import MainHeader from './components/Common/MainHeader';
import SearchResults from './components/Pages/SearchResults';
import DrinkOverview from './components/Pages/DrinkOverview';
import ShopOverview from './components/Pages/ShopOverview';
import AllDrinks from './components/Pages/AllDrinks';
import AllShops from './components/Pages/AllShops';

function App() {
  return (
    <Router>
      <MainHeader />
      <div className='emptyBlock'></div>
      <main>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route
            exact
            path="/search-results/:searchInput"
            render={({ match }) => (
              <SearchResults searchInput={match.params.searchInput} />
            )}
          />
        <Route path="/all-drinks" exact>
          <AllDrinks />
        </Route>
        <Route path="/all-shops" exact>
          <AllShops />
        </Route>
        <Route
          exact
          path="/shop/:shopId"
          render={({ match }) => (
            <ShopOverview shopId={match.params.shopId} />
          )}
        />
        <Route
          exact
          path="/drink/:drinkId"
          render={({ match }) => (
            <DrinkOverview drinkId={match.params.drinkId} />
          )}
        />
      </main>
    </Router>
  );
}

export default App;
