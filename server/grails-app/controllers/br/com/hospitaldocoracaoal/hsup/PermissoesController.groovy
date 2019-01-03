package br.com.hospitaldocoracaoal.hsup

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class PermissoesController {

    PermissoesService permissoesService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond permissoesService.list(params), model:[permissoesCount: permissoesService.count()]
    }

    def show(Long id) {
        respond permissoesService.get(id)
    }

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

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        permissoesService.delete(id)

        render status: NO_CONTENT
    }
}
