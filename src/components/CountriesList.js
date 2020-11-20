import React from 'react';
import { Link } from 'react-router-dom';

const CountriesList = (props) => {
  const {countries} = props

  return (
    <div>
      {countries.map(country => (
        <Link to={`/countries/${country.cca3}`} key={country.cca3} className="list-group-item list-group-item-action">
          {country.flag} {country.name.common}
        </Link>
      ))}
    </div>
  );
};

export default CountriesList;
