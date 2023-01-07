const { Router } = require ('express');

const configRouter = require ('../../modules/configuracao/routes/config.routes.js')

const routes = Router();

routes.use('/', configRouter)

module.exports = routes;