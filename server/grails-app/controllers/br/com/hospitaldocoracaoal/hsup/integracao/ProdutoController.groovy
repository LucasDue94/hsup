package br.com.hospitaldocoracaoal.hsup.integracao

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Transactional(readOnly = true)
class ProdutoController {

    ProdutoService produtoService

    static responseFormats = ['json', 'xml']

    @Secured('ROLE_PRODUTO_INDEX')
    def index(Integer max, String termo) {
        params.max = Math.min(max ?: 10, 100)
        List<Produto> produtoList = produtoService.list(params, termo)
        return respond(produtoList)
    }

}
