package br.com.hospitaldocoracaoal.hsup

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class UsuarioController {

    UsuarioService usuarioService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond usuarioService.list(params), model:[usuarioCount: usuarioService.count()]
    }

    def show(Long id) {
        respond usuarioService.get(id)
    }

    def create () {
        respond new Usuario(params)
    }

    def save(Usuario usuario) {
        if (usuario == null) {
            render status: NOT_FOUND
            return
        }

        try {
            usuarioService.save(usuario)
        } catch (ValidationException e) {
            respond usuario.errors, view:'create'
            return
        }

        respond usuario, [status: CREATED, view:"show"]
    }

    def update(Usuario usuario) {
        if (usuario == null) {
            render status: NOT_FOUND
            return
        }

        try {
            usuarioService.save(usuario)
        } catch (ValidationException e) {
            respond usuario.errors, view:'edit'
            return
        }

        respond usuario, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        usuarioService.delete(id)

        render status: NO_CONTENT
    }
}
