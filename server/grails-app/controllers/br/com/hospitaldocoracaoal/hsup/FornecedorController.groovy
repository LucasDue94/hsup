package br.com.hospitaldocoracaoal.hsup

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*
import grails.plugin.springsecurity.annotation.Secured

class FornecedorController {

    FornecedorService fornecedorService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_FORNECEDOR_INDEX')
    def index(Integer max, String termo) {
        params.max = Math.min(max ?: 10, 100)
        List<Fornecedor> fornecedorList = fornecedorService.list(params, termo)
        return respond(fornecedorList)
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
