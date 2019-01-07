package br.com.hospitaldocoracaoal.hsup

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*
import grails.plugin.springsecurity.annotation.Secured

class FornecedorController {

    FornecedorService fornecedorService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_FORNECEDOR_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        if (params.fantasia == null)
            respond fornecedorService.list(params), model:[fornecedorCount: fornecedorService.count()]
        else
            respond search()
    }

    @Secured('ROLE_FORNECEDOR_SHOW')
    def show(Long id) {
        respond fornecedorService.get(id)
    }

    @Secured('ROLE_FORNECEDOR_SAVE')
    def save(Fornecedor fornecedor) {
        if (fornecedor == null) {
            render status: NOT_FOUND
            return
        }

        try {
            fornecedorService.save(fornecedor)
        } catch (ValidationException e) {
            respond fornecedor.errors, view:'create'
            return
        }

        respond fornecedor, [status: CREATED, view:"show"]
    }

    @Secured('ROLE_FORNECEDOR_SEARCH')
    def search() {params.nome
        List<Fornecedor> fornecedorList = Fornecedor.withCriteria {
            if (params.containsKey('fantasia') && !params.fantasia.empty)
                ilike ('fantasia', "%${params.fantasia}%")
        }

        return fornecedorList
    }

    @Secured('ROLE_FORNECEDOR_UPDATE')
    def update(Fornecedor fornecedor) {
        if (fornecedor == null) {
            render status: NOT_FOUND
            return
        }

        try {
            fornecedorService.save(fornecedor)
        } catch (ValidationException e) {
            respond fornecedor.errors, view:'edit'
            return
        }

        respond fornecedor, [status: OK, view:"show"]
    }

    @Secured('ROLE_FORNECEDOR_DELETE')
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        fornecedorService.delete(id)

        render status: NO_CONTENT
    }
}
