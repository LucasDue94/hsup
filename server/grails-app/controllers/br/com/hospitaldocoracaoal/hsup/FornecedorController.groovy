package br.com.hospitaldocoracaoal.hsup

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class FornecedorController {

    FornecedorService fornecedorService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond fornecedorService.list(params), model:[fornecedorCount: fornecedorService.count()]
    }

    def show(Long id) {
        respond fornecedorService.get(id)
    }

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

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        fornecedorService.delete(id)

        render status: NO_CONTENT
    }
}
