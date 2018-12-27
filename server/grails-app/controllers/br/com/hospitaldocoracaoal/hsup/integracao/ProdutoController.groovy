package br.com.hospitaldocoracaoal.hsup.integracao

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class ProdutoController {

    ProdutoService produtoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max, String termo) {

        params.max = Math.min(max ?: 10, 100)

        def criteria = Produto.createCriteria()
        List<Produto> produtoList = (List<Produto>) criteria.list(params) {
            if (termo != null && !termo.isEmpty()) {
                or {
                    ilike('id', "%${termo}%")
                    ilike('descricao', "%${termo}%")
                }
            }
        }

        return respond(produtoList)
    }

}
