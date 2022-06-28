import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LandingPage from './components/Pages/LandingPage';
import MainHeader from './components/Common/MainHeader';
import ShopOverview from './components/Pages/ShopOverview';
import SearchResults from './components/Pages/SearchResults';
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
        <Route path="/shop">
          <ShopOverview />
        </Route>
      </main>
    </Router>
  );
}

export default App;
