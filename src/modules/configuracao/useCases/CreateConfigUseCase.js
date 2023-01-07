const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CertificateConfigRepository = require ('../repository/CertificatesConfigRepository');

const AppError = require('../../../shared/errors/AppError');

class CreateConfigUseCase {
  async execute({
    empresa_id,
    curso_id,
    user_id,
    url_foto
  }) {

    if(empresa_id == null || empresa_id == ''){
      throw new AppError('Company not found!', 404)
    }

    if(!url_foto){
      throw new AppError('invalid send arguments!', 404)
    }

    const companyId = Number(empresa_id)

    const certificatesRepository = new CertificateConfigRepository;
    
    
    
    const verifyCertificate = certificatesRepository.verifyCertificate(companyId, curso_id)
     if (!verifyCertificate){
         const certificate = certificatesRepository.createCertificate(companyId, curso_id, user_id, url_foto)
         return certificate
     }
    else{
        const update = certificatesRepository.updateCertificateStatus(companyId, curso_id)
        const certificate = certificatesRepository.createCertificate(companyId, curso_id, user_id, url_foto)
        return certificate
    }
    
  }
}

module.exports = CreateConfigUseCase;