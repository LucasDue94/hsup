package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service

@Service(Permissoes)
abstract class PermissoesService {

    abstract Permissoes get(Serializable id)

    List<Permissoes> list(Map args, String termo) {
        def criteria = Permissoes.createCriteria()
        List<Permissoes> permissoesList = (List<Permissoes>) criteria.list(args) {
            if (termo != null && !termo.isEmpty()) {
                or {
                    ilike('authority', "%${termo}%")
                }
            }
        }

        return permissoesList
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Permissoes save(Permissoes permissoes)

}