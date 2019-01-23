package br.com.hospitaldocoracaoal.hsup.integracao

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Transactional(readOnly = true)
class ProdutoController {

    ProdutoService produtoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_PRODUTO_INDEX')
    def index(Integer max, String termo) {
        params.max = Math.min(max ?: 10, 100)

        List<Produto> produtoList = produtoService.list(params, termo)
        Long count = Produto.countDistinctProducts()

        respond produtoList, model: [total: count]
    }
}
