package br.com.hospitaldocoracaoal.hsup

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class PermissoesController {

    PermissoesService permissoesService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_PERMISSOES_INDEX')
    def index(Integer max) {
        respond permissoesService.list(params), model:[permissoesCount: permissoesService.count()]
    }

    @Secured('ROLE_PERMISSOES_SHOW')
    def show(Long id) {
        respond permissoesService.get(id)
    }

    @Secured('ROLE_PERMISSOES_SAVE')
    def save(Permissoes permissoes) {
        if (permissoes == null) {
            render status: NOT_FOUND
            return
        }

        try {
            permissoesService.save(permissoes)
        } catch (ValidationException e) {
            respond permissoes.errors, view:'create'
            return
        }

        respond permissoes, [status: CREATED, view:"show"]
    }

    @Secured('ROLE_PERMISSOES_UPDATE')
    def update(Permissoes permissoes) {
        if (permissoes == null) {
            render status: NOT_FOUND
            return
        }

        try {
            permissoesService.save(permissoes)
        } catch (ValidationException e) {
            respond permissoes.errors, view:'edit'
            return
        }

        respond permissoes, [status: OK, view:"show"]
    }

    @Secured('ROLE_PERMISSOES_DELETE')
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        permissoesService.delete(id)

        render status: NO_CONTENT
    }
}
