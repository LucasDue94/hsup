package br.com.hospitaldocoracaoal.hsup

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class UnidadeMedidaController {

    UnidadeMedidaService unidadeMedidaService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond unidadeMedidaService.list(params), model:[unidadeMedidaCount: unidadeMedidaService.count()]
    }

    def show(Long id) {
        respond unidadeMedidaService.get(id)
    }

    def save(UnidadeMedida unidadeMedida) {
        if (unidadeMedida == null) {
            render status: NOT_FOUND
            return
        }

        try {
            unidadeMedidaService.save(unidadeMedida)
        } catch (ValidationException e) {
            respond unidadeMedida.errors, view:'create'
            return
        }

        respond unidadeMedida, [status: CREATED, view:"show"]
    }

    def update(UnidadeMedida unidadeMedida) {
        if (unidadeMedida == null) {
            render status: NOT_FOUND
            return
        }

        try {
            unidadeMedidaService.save(unidadeMedida)
        } catch (ValidationException e) {
            respond unidadeMedida.errors, view:'edit'
            return
        }

        respond unidadeMedida, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        unidadeMedidaService.delete(id)

        render status: NO_CONTENT
    }
}
