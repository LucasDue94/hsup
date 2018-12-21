package br.com.hospitaldocoracaoal.hsup

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class PerfilController {

    PerfilService perfilService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond perfilService.list(params), model:[perfilCount: perfilService.count()]
    }

    def show(Long id) {
        respond perfilService.get(id)
    }

    def save(Perfil perfil) {
        if (perfil == null) {
            render status: NOT_FOUND
            return
        }

        try {
            perfilService.save(perfil)
        } catch (ValidationException e) {
            respond perfil.errors, view:'create'
            return
        }

        respond perfil, [status: CREATED, view:"show"]
    }

    def update(Perfil perfil) {
        if (perfil == null) {
            render status: NOT_FOUND
            return
        }

        try {
            perfilService.save(perfil)
        } catch (ValidationException e) {
            respond perfil.errors, view:'edit'
            return
        }

        respond perfil, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        perfilService.delete(id)

        render status: NO_CONTENT
    }
}
