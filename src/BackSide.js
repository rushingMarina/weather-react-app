import React from 'react';
import CitiesList from "./CitiesList";
import "./button.css";

export default ({onClick, cities, currentCity, onSelect}) => {
  return (
    <div className="card-back">
      <CitiesList
      cities={cities}
      currentCity={currentCity}
      onSelect={onSelect}
      />
      <button className="button" onClick={onClick}>Flip Back</button>
    </div>
  );
};
