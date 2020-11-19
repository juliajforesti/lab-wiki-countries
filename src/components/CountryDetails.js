import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CountryDetails = (props) => {
  const [state, setState] = useState({
    name: '',
    capital: '',
    area: '',
    borders: [],
    flag: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const country = props.countriesList.find(
      (item) => item.cca3 === props.match.params.cca3
    );
    if (country) {
      setState({
        name: country.name.common,
        capital: country.capital,
        area: country.area,
        borders: country.borders,
        flag: country.flag
      });
      setIsLoading(false);
    }
  }, [props]);

  useEffect(() => {
    setIsLoading(false);
  }, [state]);

  return (
    <div>
      {isLoading ? (
        <div
          className="spinner-border text-primary"
          style={{width: "8rem", height: "8rem", position: 'fixed', top: '50%', left: '50%'}}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div
          className="col-7"
          style={{
            position: 'fixed',
            top: '10rem',
            left: '40%',
            width: '40vw',
          }}
        >
          <h1 className='text-center'>{state.flag} {state.name}</h1>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}><strong>Capital</strong></td>
                <td>{state.capital}</td>
              </tr>
              <tr>
                <td><strong>Area</strong></td>
                <td>
                  {state.area} km
                  <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td><strong>Borders</strong></td>
                <td>
                  <ul>
                    {state.borders.map((cca3) => {
                      const countryObj = props.countriesList.find(
                        (item) => item.cca3 === cca3
                      );
                      return (
                        <li key={cca3}>
                          <Link to={`/countries/${cca3}`}>
                            {countryObj.name.common}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
