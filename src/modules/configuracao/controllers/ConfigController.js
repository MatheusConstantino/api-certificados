const ListConfigUseCase = require('../useCases/ListConfigUseCase');
const CreateConfigUseCase = require('../useCases/CreateConfigUseCase');

module.exports = class ConfigController {
  async list(request, response) {
    const {
      empresa_id
    } = request.params;

    const listConfig = new ListConfigUseCase;

    const list = await listConfig.execute({
      empresa_id: empresa_id
    });

    return response.json(list);
  }

  async create(request, response) {
    const {
      empresa_id
    } = request.params
    const {
      curso_id,
      user_id,
      url_foto
    } = request.body

    const createConfig = new CreateConfigUseCase
    const create = await createConfig.execute({
      empresa_id,
      curso_id,
      user_id,
      url_foto
    })

    return response.json(create)

  }
}
