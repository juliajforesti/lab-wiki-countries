import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import countries from './countries.json';
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
        console.log(response)
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
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="d-flex align-items-between w-25">
          <div className="container">
            <div className="row">
              <div>
                <div className="list-group ">
                  {state.countriesList.map((country) => (
                    <Link key={country.cca3}>
                      <CountriesList
                        country={country}
                        countriesList={state.countriesList}
                      />
                    </Link>
                  ))}
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
