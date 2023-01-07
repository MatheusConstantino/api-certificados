const CertificatesConfigUseCase = require('../src/modules/configuracao/useCases/ListConfigUseCase');
const AppError = require('../src/shared/errors/AppError');

let certificatesConfigUseCase;
describe('listCertificates', () => {
  beforeEach(() => {
    certificatesConfigUseCase = new CertificatesConfigUseCase();
  });

  it('Tem que ser possivel listar os certificados internos da empresa', async () => {
    const certificate = await certificatesConfigUseCase.execute({
      empresa_id: 48
    });
    expect([])
  });

  it('Não deve ser possivel listar os certificados internos da empresa', async () => {
    await expect(certificatesConfigUseCase.execute({
        empresa_id: null,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});