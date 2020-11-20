import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import axios from 'axios'

function App() {
  const [state, setState] = useState({
    countriesList: [],
    isLoading: true
  });

  useEffect(() => {
    (async function(){
      try {
        const response = await axios.get('https://countries.tech-savvy.tech/countries')
        setState({...state, countriesList: [...response.data]});
      } catch (err) {
        console.error(err)
      }
    })()
  }, []);
  
  useEffect(() => {
    setState({...state, isLoading: false});
  }, [state.countriesList]);

  return (
    <div className="">
      <Navbar />
      {state.isLoading ? (
        <div
          className="spinner-border text-primary"
          style={{width: "8rem", height: "8rem", position: 'fixed', top: '50%', left: '50%'}}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="d-flex align-items-between w-25">
          <div className="container">
            <div className="row">
              <div>
                <div className="list-group" style={{marginTop: '3.5rem'}}>
                  <CountriesList
                    countries={state.countriesList}
                  />
                </div>
              </div>
            </div>
          </div>
          <Switch>
            <Route
              exact
              path="/countries/:cca3"
              render={(props) => (
                <CountryDetails {...props} countriesList={state.countriesList} />
              )}
            />
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
