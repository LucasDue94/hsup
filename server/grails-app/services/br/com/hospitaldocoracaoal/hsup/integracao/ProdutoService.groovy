package br.com.hospitaldocoracaoal.hsup.integracao

import grails.gorm.services.Service

@Service(Produto)
abstract class ProdutoService {

    abstract Produto get(Serializable id)

    List<Produto> list(Map args, String termo) {
        def criteria = Produto.createCriteria()
        List<Produto> produtoList = (List<Produto>) criteria.list(args) {
            if (termo != null && !termo.isEmpty()) {
                or {
                    ilike('id', "%${termo}%")
                    ilike('descricao', "%${termo}%")
                }
            }
        }

        return produtoList
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Produto save(Produto produto)

    abstract List<Produto> list(Map args)

}