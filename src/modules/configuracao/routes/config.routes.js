const { Router } = require ('express');

const configController = require ('../controllers/ConfigController');

const configRouter = Router();
const configuracoesController = new configController();

configRouter.get('/company/:empresa_id/certificates',
configuracoesController.list,
);

configRouter.post('/company/:empresa_id/certificate',
configuracoesController.create,
);

module.exports = configRouter;