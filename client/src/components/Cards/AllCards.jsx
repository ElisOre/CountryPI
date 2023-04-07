import Card from "./Card";
import { getCountries } from "../../redux/actions";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function AllCards() {
  const dispatch = useDispatch();
  // Pedido estado de redux
  let estadoCountry = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="card">
      {estadoCountry.length ? (
        estadoCountry.map((pais) => {
          return (
            <Link to={`/details/${pais.id}`}>
              <Card
                flags={pais.flags}
                name={pais.name}
                region={pais.region}
                key={pais.id}
              />
            </Link>
          );
        })
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
}
