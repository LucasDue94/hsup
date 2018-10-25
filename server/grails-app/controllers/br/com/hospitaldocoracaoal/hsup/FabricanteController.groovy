package br.com.hospitaldocoracaoal.hsup

import grails.converters.JSON
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class FabricanteController {

    FabricanteService fabricanteService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond fabricanteService.list(params), model:[fabricanteCount: fabricanteService.count()]
    }

    def show(Long id) {
        respond fabricanteService.get(id)
    }

    def save(Fabricante fabricante) {
        if (fabricante == null) {
            render status: NOT_FOUND
            return
        }

        try {
            fabricanteService.save(fabricante)
        } catch (ValidationException e) {
            respond fabricante.errors, view:'create'
            return
        }

        request.withFormat {
            form multipartForm {
                redirect action: 'index', method: 'GET'
                flash.success = message(code: 'default.created.message', args: [message(code: 'fabricante.create.label', default: 'Fabricante'), fabricante.nome.toUpperCase()])
            }
            '*' { respond fabricante, [status: CREATED] }
        }
    }

    def update(Fabricante fabricante) {
        if (fabricante == null) {
            render status: NOT_FOUND
            return
        }

        try {
            fabricanteService.save(fabricante)
        } catch (ValidationException e) {
            respond fabricante.errors, view:'edit'
            return
        }

        respond fabricante, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        fabricanteService.delete(id)

        render status: NO_CONTENT
    }
}
