const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const country = require('./country.js');
const activity = require('./activity.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', country);
router.use('/activity', activity);

module.exports = router;
