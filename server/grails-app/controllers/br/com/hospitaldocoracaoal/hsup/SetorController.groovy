package br.com.hospitaldocoracaoal.hsup

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class SetorController {

    SetorService setorService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        if (params.nome == null)
            respond setorService.list(params), model:[setorCount: setorService.count()]
        else
            respond search()
    }

    def show(Long id) {
        respond setorService.get(id)
    }

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

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        setorService.delete(id)

        render status: NO_CONTENT
    }

    def search() {params.nome
        List<Setor> setorList = Setor.withCriteria {
            if (params.containsKey('nome') && !params.nome.empty)
                ilike ('nome', "%${params.nome}%")
        }

        return setorList
    }
}
