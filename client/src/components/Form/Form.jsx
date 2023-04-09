import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

function validate(activity) {
  let err = {};

  if (!activity.name) {
    err.name = "Name is required";
  } else if (!activity.dificulty) {
    err.dificulty = "A difficulty is required";
  } else if (!activity.season) {
    err.season = "A season is required";
  } else if (!activity.country.length) {
    err.country = "Select at least one country";
  }

  return err;
}

export default function Form() {
  const countries = useSelector((state) => state.filtered);
  const history = useHistory();

  const [errors, setErrors] = useState({ form: "Complete form" });
  const [activity, setActivity] = useState({
    name: "",
    dificulty: "",
    season: "",
    time: "",
    country: [],
  });

  const setDataHandler = (e) => {
    e.preventDefault();

    setActivity({
      ...activity,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...activity,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleCountries = (e) => {
    e.preventDefault();
    if (activity.country.includes(e.target.value)) {
      return alert("This country has already been loaded");
    } else {
      setActivity({
        ...activity,
        country: [...activity.country, e.target.value],
      });
    }
  };

  const handleDelete = (e) => {
    setActivity({
      ...activity,
      country: activity.country.filter((el) => el !== e),
    });
  };

  useEffect(() => {
    setErrors(validate(activity));
  }, [activity]);

  const submitForm = (e) => {
    e.preventDefault();
    setErrors(
      validate({
        ...activity,
        [e.target.name]: e.target.value,
      })
    );

    if (Object.values(errors).length === 0) {
      axios.post("http://localhost:3001/activity", activity);
      setActivity({
        name: "",
        dificulty: "",
        season: "",
        time: "",
        country: [],
      });

      alert("The activity was successfully created!");
      history.push("/home");
    }
  };

  return (
    <section className="section">
      <div className="containerForm">
        <h3>Create an activity</h3>
        <form className="form" onSubmit={(e) => submitForm(e)}>
          <>
            <label>Name: </label>
            <input
              type="text"
              value={activity.name}
              name="name"
              placeholder="Name of activity..."
              onChange={setDataHandler}
            />
            {errors.name ? <p>{errors.name}</p> : null}
          </>
          <>
            <label>Difficulty: </label>
            <select
              name="dificulty"
              id="dificulty"
              value={activity.dificulty}
              onChange={setDataHandler}
            >
              <option value="default">Choose a difficulty</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            {errors.dificulty ? <p>{errors.dificulty}</p> : null}
          </>
          <>
            <label>Duration: </label>
            <select
              type="text"
              name="time"
              id="time"
              value={activity.time}
              onChange={setDataHandler}
            >
              <option value="default">Choose a duration (in hours)</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
            </select>
          </>
          <>
            <label>Season: </label>
            <select
              name="season"
              id="season"
              value={activity.season}
              onChange={setDataHandler}
            >
              <option value="default">Choose a season</option>
              <option value="verano">Summer</option>
              <option value="primavera">Spring</option>
              <option value="otoño">Autumn</option>
              <option value="invierno">Winter</option>
            </select>
            {errors.season ? <p>{errors.season}</p> : null}
          </>
          <>
            <label>Country: </label>
            <select onChange={handleCountries}>
              <option value="default">Select a country</option>
              {countries.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.country ? <p>{errors.country}</p> : null}
          </>
          <>
            {activity.country.map((e) => (
              <div className="delete" key={e}>
                <p>{e}</p>
                <button className="btnDelete" onClick={() => handleDelete(e)}>
                  X
                </button>
              </div>
            ))}
          </>
          <div className="btnSubmit">
            <input type="submit" value="Add activity" />
          </div>
        </form>

        <Link to="/home">
          <button className="volver">Back to home</button>
        </Link>
      </div>
    </section>
  );
}
