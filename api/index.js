//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const { Country } = require("./src/db.js");
const axios = require("axios");

// Función para llamar a la api
async function createDB() {
  const { data } = await axios.get("https://restcountries.com/v3/all");
  const db = data?.map((el) => {
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

  await Country.bulkCreate(db);
}

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await createDB();
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
