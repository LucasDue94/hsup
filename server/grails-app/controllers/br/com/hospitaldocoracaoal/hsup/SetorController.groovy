package br.com.hospitaldocoracaoal.hsup

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

class SetorController {

    SetorService setorService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_SETOR_INDEX')
    def index(Integer max, String termo) {
        params.max = Math.min(max ?: 10, 100)
        List<Setor> setorList = setorService.list(params, termo)
        return respond(setorList)
    }

    @Secured('ROLE_SETOR_SHOW')
    def show(Long id) {
        respond setorService.get(id)
    }

    @Secured('ROLE_SETOR_SAVE')
    def save(Setor setor) {
        if (setor == null) {
            render status: NOT_FOUND
            return
        }

        try {
            setorService.save(setor)
        } catch (ValidationException e) {
            respond setor.errors, view:'create'
            return
        }

        respond setor, [status: CREATED, view:"show"]
    }

    @Secured('ROLE_SETOR_UPDATE')
    def update(Setor setor) {
        if (setor == null) {
            render status: NOT_FOUND
            return
        }

        try {
            setorService.save(setor)
        } catch (ValidationException e) {
            respond setor.errors, view:'edit'
            return
        }

        respond setor, [status: OK, view:"show"]
    }

    @Secured('ROLE_SETOR_DELETE')
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        setorService.delete(id)

        render status: NO_CONTENT
    }
}