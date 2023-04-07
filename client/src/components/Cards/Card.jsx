import React from "react";
import './card.css';

export default function Card({flags, name, region}) {
    return (
        <div className="card">
            <img src={flags} alt={name} />
            <h2>Country: {name}</h2>
            <h4>Continent: {region}</h4>
        </div>
    );
};