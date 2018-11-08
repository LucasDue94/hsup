package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service

@Service(Fornecedor)
interface FornecedorService {

    Fornecedor get(Serializable id)

    List<Fornecedor> list(Map args)

    Long count()

    void delete(Serializable id)

    Fornecedor save(Fornecedor fornecedor)

}