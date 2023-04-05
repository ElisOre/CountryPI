const { Activity, Country } = require("../db");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { name, dificulty, time, season, country } = req.body;
  // compruebo si están todos los parámetros
  if (name && dificulty && season && country) {
    try {
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

      // Agrego la actividad al país
      await newActivity.addCountry(pais);
      res.send(newActivity);
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(400).send("Faltan parámetros.");
  }
});

router.get("/", async (req, res) => {
  try {
    const act = await Activity.findAll();
    res.status(200).json(act);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
