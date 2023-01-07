const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const AppError = require('../../../shared/errors/AppError');

class ListConfigRepository {
    async listCertificates(empresa_id) {
        const certificates = await prisma.certificados_configuracao.findMany({
            where: {
                certificado_empresa_id: empresa_id,
                AND: {
                    certificado_status: 1
                }
            }
        });

        return certificates;
    }

    async createCertificate(empresa_id, curso_id, user_id, url_foto){
        const create = await prisma.certificados_configuracao.create({
            data:{
                certificado_empresa_id: empresa_id,
                certificado_usuario_criacao: user_id,
                certificado_curso_id: curso_id,
                certificado_background: url_foto,
                certificado_status: 1
            },
        })
        return create
    }

    async verifyCertificate (empresa_id, curso_id){
        const verify = await prisma.certificados_configuracao.findMany({
                where: {
                    certificado_empresa_id: empresa_id,
                    AND: {
                        certificado_status: 1,
                        certificado_curso_id: curso_id
                    }
                },
        })
        return verify
    }

    async updateCertificateStatus (empresa_id, curso_id){
        const update = await prisma.certificados_configuracao.updateMany({
                where: {
                    certificado_empresa_id: empresa_id
                },
                data: {
                    certificado_status: 0
                }
        })
        return update
    }
}

module.exports = ListConfigRepository;