package br.com.hospitaldocoracaoal.hsup.integracao

import grails.gorm.services.Service

@Service(Produto)
abstract class ProdutoService {

    abstract Produto get(Serializable id)

    List<Produto> list(Map args, String termo) {
        def criteria = Produto.createCriteria()
        List<Object[]> produtoList = (List<Object[]>) criteria.list(args) {
            if (termo != null && !termo.isEmpty()) {
                or {
                    ilike('codigo', "%${termo}%")
                    ilike('descricao', "%${termo}%")
                }
            }

            projections {
                groupProperty 'codigo'
                groupProperty 'descricao'
                sum 'estoque'
                groupProperty 'unidade_estoque'
            }
        }


        final int CODIGO = 0
        final int DESCRICAO = 1
        final int ESTOQUE = 2
        final int UNIDADE_ESTOQUE = 3

        return produtoList.collect { row ->
            new Produto(codigo: row[CODIGO],
                    descricao: row[DESCRICAO],
                    estoque: row[ESTOQUE] as Long,
                    unidade_estoque: row[UNIDADE_ESTOQUE],
            )
        }

    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Produto save(Produto produto)

    abstract List<Produto> list(Map args)

}