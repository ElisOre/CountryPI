import React from "react";
import './card.css';

export default function Card({flags, name, region, id}) {
    return (
        <div className="card" key={id}>
            <img src={flags} alt={name} />
            <h2>País: {name}</h2>
            <h4>Continente: {region}</h4>
        </div>
    );
};