const { Activity, Country } = require("../db");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { name, dificulty, time, season, country } = req.body;
  // compruebo si están todos los parámetros
  if (name && dificulty && time && season && country) {
    const newActivity = await Activity.create({
      name,
      dificulty,
      time,
      season,
    });

    // Busco el nombre del país
    const pais = await Country.findAll({
      where: {
        id: country,
      },
    });

    // Agrego la actividad al país/es
    await newActivity.addCountry(pais);
    request.send(newActivity);
  } else {
    return res.status(400).send("Faltan parámetros.");
  }
});

router.get("/", async (req, res) => {
  try {
    const act = await Activity.findAll();
    return res.status(200).json(act);
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = router;
