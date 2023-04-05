const router = require("express").Router();
const axios = require("axios");
const { Country, Activity } = require("../db");
const seqlz = require("sequelize");

router.get("/", async (req, res) => {
  // name por queries
  const { name } = req.query;

  // hago el pedido a la api
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
    console.log(error);
  }

  // búsqueda por name
  if (name) {
    // busco el país
    try {
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
    } catch (error) {
      console.log(error);
    }
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

router.get("/:idPais", async (req, res) => {
  const { idPais } = req.params;
  try {
    // traigo el país por params
    const unPais = await Country.findOne({
      where: {
        id: idPais.toUpperCase(),
      },
      include: {
        model: Activity,
      },
    });

    if (unPais) {
      // si existe el país
      return res.status(200).json(unPais);
    } else {
      res.status(404).send("El país no se ha encontrado.");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;