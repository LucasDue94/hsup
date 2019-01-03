package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service

@Service(Permissoes)
interface PermissoesService {

    Permissoes get(Serializable id)

    List<Permissoes> list(Map args)

    Long count()

    void delete(Serializable id)

    Permissoes save(Permissoes permissoes)

}