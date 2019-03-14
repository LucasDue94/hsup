package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service

@Service(Perfil)
abstract class PerfilService {

    abstract Perfil get(Serializable id)

    List<Perfil> list(Map args, String termo) {
        def criteria = Perfil.createCriteria()
        List<Perfil> perfilList = (List<Perfil>) criteria.list(args) {
            if (termo != null && !termo.isEmpty()) {
                or {
                    ilike('id', "%${termo}%")
                    ilike('name', "%${termo}%")
                }
            }
        }

        return perfilList
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Perfil save(Perfil perfil)

}