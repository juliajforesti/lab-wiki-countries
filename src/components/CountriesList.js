import React from 'react';
import { Link } from 'react-router-dom';

const CountriesList = (props) => {
  const {name, cca3} = props.country
  return (
    <Link to={`/countries/${cca3}`} className="list-group-item list-group-item-action">
      {name.common}
    </Link>
  );
};

export default CountriesList;
