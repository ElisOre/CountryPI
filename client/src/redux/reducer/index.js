// Importo las actions
import {
  GET_COUNTRIES,
  GET_COUNTRY_BY_QUERY,
  GET_COUNTRY_DETAILS,
  ORDER_BY_POPULATION,
  ORDER_BY_CONTINENT,
  ORDER_BY_NAME,
  ORDER_BY_ACTIVITY,
  GET_ACTIVITIES,
  GET_BY_ACTIVITY,
} from "../actions";

const initialState = {
  countries: [],
  countryDetail: [],
  filtered: [],
  activities: [],
  activityFilter: [],
};

function hasActivity(activity, country) {
  const activ = country.activity;

  let has = false;
  activ.forEach((act) => {
    if (act.name === activity) has = true;
  });

  return has;
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state, // copio al estado inicial
        countries: action.payload,
        filtered: action.payload,
      };

    case GET_COUNTRY_DETAILS:
      return {
        ...state,
        countryDetail: action.payload,
      };

    case GET_COUNTRY_BY_QUERY:
      return {
        ...state,
        filtered: state.countries.filter((e) =>
          e.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };

    case ORDER_BY_ACTIVITY:
      const filtre = state.activities;
      const activi =
        action.payload === "All"
          ? filtre
          : filtre.filter((e) => (e.name ? e.name === action.payload : null));

      return {
        ...state,
        activityFilter: activi,
      };

    case ORDER_BY_POPULATION:
      if (action.payload === "Min") {
        return {
          ...state,
          filtered: [...state.filtered].sort((prev, next) => {
            if (prev.population > next.population) return 1;
            if (prev.population < next.population) return -1;
            return 0;
          }),
        };
      }

      if (action.payload === "Max") {
        return {
          ...state,
          filtered: [...state.filtered].sort((prev, next) => {
            if (prev.population > next.population) return -1;
            if (prev.population < next.population) return 1;
            return 0;
          }),
        };
      }

      if (action.payload === "All") {
        return {
          ...state,
          filtered: state.countries,
        };
      } else {
        return {
          ...state,
          filtered: state.countries,
        };
      }

    case ORDER_BY_CONTINENT:
      const statusFilter =
        action.payload === "All"
          ? state.countries
          : state.countries.filter((el) =>
              el.continent
                ? el.continent.toLowerCase() === action.payload.toLowerCase()
                : null
            );
      return {
        ...state,
        filtered: statusFilter,
      };

    case ORDER_BY_NAME:
      if (action.payload === "A-Z") {
        return {
          ...state,
          filtered: [...state.filtered].sort((prev, next) => {
            if (prev.name > next.name) return 1;
            if (prev.name < next.name) return -1;
            return 0;
          }),
        };
      }

      if (action.payload === "Z-A") {
        return {
          ...state,
          filtered: [...state.filtered].sort((prev, next) => {
            if (prev.name > next.name) return -1;
            if (prev.name < next.name) return 1;
            return 0;
          }),
        };
      }

      if (action.payload === "All") {
        return { ...state, filtered: state.countries };
      } else {
        return { ...state, filtered: state.countries };
      }

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_BY_ACTIVITY:
      return {
        ...state,
        filtered: state.countries.filter((country) =>
          hasActivity(country, action.payload)
        ),
      };

    default:
      return state;
  }
}
