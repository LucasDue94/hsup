package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service

@Service(Fornecedor)
abstract class FornecedorService {

    abstract Fornecedor get(Serializable id)

    List<Fornecedor> list(Map args, String termo) {
        def criteria = Fornecedor.createCriteria()
        List<Fornecedor> fornecedorList = (List<Fornecedor>) criteria.list(args) {
            if (termo != null && !termo.isEmpty()) {
                or {
                    ilike('fantasia', "%${termo}%")
                }
            }
        }

        return fornecedorList
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Fornecedor save(Fornecedor fornecedor)

}