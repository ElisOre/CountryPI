const router = require("express").Router();
const axios = require("axios");
const { Country, Activity } = require("../db");
const seqlz = require("sequelize");

router.get("/countries", async (req, res) => {
  // name por queries
  const { name } = req.query;

  // callback a la api
  const { data } = await axios.get("https://restcountries.com/v3/all");
  const resp = data?.map((el) => {
    return {
      id: el.cca3,
      name: el.name.common,
      flags: el.flags[0],
      region: el.region,
      capital: el.capital ? el.capital[0] : "Este país no tiene capital",
      subregion: el.subregion,
      area: el.area,
      population: el.population,
    };
  });

  try {
    let db = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    // chequeo que la base de datos esté vacía para la carga de datos
    if (!db.length) {
      await Country.bulkCreate(resp); // inserta múltiples registros en la tabla
    }
  } catch (error) {
    throw new Error(error);
  }

  // búsqueda por name
  if (name) {
    // busco el país
    const pais = await Country.findAll({
      where: {
        name: {
          [seqlz.Op.iLike]: `%${name}%`, // ilike trabaja entre mayúsculas y minúsculas
        },
      },
    });
    // devuelvo el pais en caso de encontrarlo
    pais.length
      ? res.status(200).send(pais)
      : res.status(404).send("No se ha encontrado el país.");
  } else {
    // si no hay name devuelvo todos los países
    const paises = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    res.status(200).json(paises);
  }
});
