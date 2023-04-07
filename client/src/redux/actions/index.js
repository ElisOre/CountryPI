import axios from "axios";

// Asigno los nombres de las types a constantes para evitar posibles fallos
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_BY_QUERY = "GET_COUNTRY_BY_QUERY";
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const ORDER_BY_CONTINENT = "ORDER_BY_CONTINENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ACTIVITY = "ORDER_BY_ACTIVITY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_BY_ACTIVITY = "GET_BY_ACTIVITY";

export function getCountries() {
  return async (dispatch) => {
    const countryDb = await axios.get("http://localhost:3001/countries");
    dispatch({
      type: GET_COUNTRIES,
      payload: countryDb.data,
    });
  };
}

export function getCountryBySearch(name) {
  return (dispatch) => {
    dispatch({
      type: GET_COUNTRY_BY_QUERY,
      payload: name,
    });
  };
}

export function getCountryDetails(idPais) {
  return async (dispatch) => {
    try {
      const idPaisDb = await axios.get(`http://localhost:3001/countries/${idPais}`);
      dispatch({
        type: GET_COUNTRY_DETAILS,
        payload: idPaisDb.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderByName(payload) {
  return (dispatch) => {
    dispatch({
      type: ORDER_BY_NAME,
      payload,
    });
  };
}

export function orderByContinent(payload) {
  return (dispatch) => {
    dispatch({
      type: ORDER_BY_CONTINENT,
      payload,
    });
  };
}

export function orderByPopulation(payload) {
  return (dispatch) => {
    dispatch({
      type: ORDER_BY_POPULATION,
      payload,
    });
  };
}

export function orderByActivity(payload) {
  return (dispatch) => {
    dispatch({
      type: ORDER_BY_ACTIVITY,
      payload,
    });
  };
}

export function getActivities() {
  return async (dispatch) => {
    const actDb = await axios.get("http://localhost:3001/activity");
    dispatch({
      type: GET_ACTIVITIES,
      payload: actDb.data,
    });
  };
}

export function getByActivity(payload) {
  return (dispatch) => {
    dispatch({
      type: GET_BY_ACTIVITY,
      payload,
    });
  };
}
