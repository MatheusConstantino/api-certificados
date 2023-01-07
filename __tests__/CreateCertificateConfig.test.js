const CertificatesConfigUseCase = require('../src/modules/configuracao/useCases/CreateConfigUseCase');
const AppError = require('../src/shared/errors/AppError');

let certificatesConfigUseCase;
describe('createCertificates', () => {
  beforeEach(() => {
    certificatesConfigUseCase = new CertificatesConfigUseCase();
  });

  it('Tem que ser possivel criar um certificado para empresa', async () => {
    const certificate = await certificatesConfigUseCase.execute({
      empresa_id: 48,
      curso_id: 100000,
      user_id: 100000,
      url_foto: "caseTest.png"
    });
    expect([])
  });

  it('Não deve ser possivel criar os certificados internos da empresa', async () => {
    await expect(certificatesConfigUseCase.execute({
      empresa_id: null,
      curso_id: 10,
      user_id: 1823,
      url_foto: null
    }), ).rejects.toBeInstanceOf(AppError);
  });
});