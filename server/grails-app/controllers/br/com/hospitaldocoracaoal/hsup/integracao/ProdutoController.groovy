package br.com.hospitaldocoracaoal.hsup.integracao

class ProdutoController {

    ProdutoService produtoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max, String termo) {
        params.max = Math.min(max ?: 10, 100)

        List<Produto> produtoList = produtoService.list(params, termo)

        return respond(produtoList)
    }
}
