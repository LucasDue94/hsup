package br.com.hospitaldocoracaoal.hsup.integracao

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class ProdutoController {

    ProdutoService produtoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond produtoService.list(params), model:[produtoCount: produtoService.count()]
    }

    def show(Long id) {
        respond produtoService.get(id)
    }

    def save(Produto produto) {
        if (produto == null) {
            render status: NOT_FOUND
            return
        }

        try {
            produtoService.save(produto)
        } catch (ValidationException e) {
            respond produto.errors, view:'create'
            return
        }

        respond produto, [status: CREATED, view:"show"]
    }

    def update(Produto produto) {
        if (produto == null) {
            render status: NOT_FOUND
            return
        }

        try {
            produtoService.save(produto)
        } catch (ValidationException e) {
            respond produto.errors, view:'edit'
            return
        }

        respond produto, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        produtoService.delete(id)

        render status: NO_CONTENT
    }
}
