const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ListConfigRepository = require ('../repository/CertificatesConfigRepository');

const AppError = require('../../../shared/errors/AppError');

class ListConfigUseCase {
  async execute({
    empresa_id,
  }) {

    if(empresa_id == null){
      throw new AppError('Company not found!', 404)
    }

    const certificatesRepository = new ListConfigRepository;

    const certificates = certificatesRepository.listCertificates(Number(empresa_id))
    
      return certificates
  }
}

module.exports = ListConfigUseCase;