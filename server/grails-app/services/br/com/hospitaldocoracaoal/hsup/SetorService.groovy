package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service

@Service(Setor)
abstract class SetorService {

    abstract Setor get(Serializable id)

    List<Setor> list(Map args, String termo) {
        def criteria = Setor.createCriteria()
        List<Setor> setorList = (List<Setor>) criteria.list(args) {
            if (termo != null && !termo.isEmpty()) {
                or {
                    ilike('nome', "%${termo}%")
                }
            }
        }

        return setorList
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Setor save(Setor setor)

}