package br.com.hospitaldocoracaoal.hsup

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

class FabricanteController {

    FabricanteService fabricanteService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_FABRICANTE_INDEX')
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        if (params.fantasia == null)
            respond fabricanteService.list(params), model:[fabricanteCount: fabricanteService.count()]
        else
            respond search()
    }

    @Secured('ROLE_FABRICANTE_SHOW')
    def show(Long id) {
        respond fabricanteService.get(id)
    }

    @Secured('ROLE_FABRICANTE_SAVE')
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
                flash.success = message(code: 'default.created.message', args: [message(code: 'fabricante.create.label', default: 'Fabricante'), fabricante.fantasia.toUpperCase()])
            }
            '*' { respond fabricante, [status: CREATED] }
        }
    }

    @Secured('ROLE_FABRICANTE_INDEX')
    def search() {
        List<Fabricante> fabricanteList = Fabricante.withCriteria {
            if (params.containsKey('fantasia') && !params.fantasia.empty)
                ilike ('fantasia', "%${params.fantasia}%")
        }

        return fabricanteList
    }

    @Secured('ROLE_FABRICANTE_UPDATE')
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

    @Secured('ROLE_FABRICANTE_DELETE')
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        fabricanteService.delete(id)

        render status: NO_CONTENT
    }
}
