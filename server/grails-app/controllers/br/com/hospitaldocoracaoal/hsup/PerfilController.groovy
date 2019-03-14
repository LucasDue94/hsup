package br.com.hospitaldocoracaoal.hsup

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class PerfilController {

    PerfilService perfilService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_PERFIL_INDEX')
    def index(Integer max, String termo) {
        params.max = Math.min(max ?: 10, 100)
        List<Perfil> perfilList = perfilService.list(params, termo)
        return respond(perfilList)
    }

    @Secured('ROLE_PERFIL_SHOW')
    def show(Long id) {
        respond perfilService.get(id)
    }

    @Secured('ROLE_PERFIL_SAVE')
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

    @Secured('ROLE_PERFIL_UPDATE')
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

    @Secured('ROLE_PERFIL_DELETE')
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        perfilService.delete(id)

        render status: NO_CONTENT
    }
}
