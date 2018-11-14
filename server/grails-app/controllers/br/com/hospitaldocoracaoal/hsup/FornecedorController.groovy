package br.com.hospitaldocoracaoal.hsup

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class FornecedorController {

    FornecedorService fornecedorService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        if (params.fantasia == null)
            respond fornecedorService.list(params), model:[fornecedorCount: fornecedorService.count()]
        else
            respond search()
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

    def search() {params.nome
        List<Fornecedor> fornecedorList = Fornecedor.withCriteria {
            if (params.containsKey('fantasia') && !params.fantasia.empty)
                ilike ('fantasia', "%${params.fantasia}%")
        }

        return fornecedorList
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
