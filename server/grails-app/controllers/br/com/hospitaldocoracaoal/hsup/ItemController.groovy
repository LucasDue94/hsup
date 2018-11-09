package br.com.hospitaldocoracaoal.hsup

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class ItemController {

    ItemService itemService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond itemService.list(params), model:[itemCount: itemService.count()]
    }

    def show(Long id) {
        respond itemService.get(id)
    }

    def save(Item item) {
        if (item == null) {
            render status: NOT_FOUND
            return
        }

        try {
            itemService.save(item)
        } catch (ValidationException e) {
            respond item.errors, view:'create'
            return
        }

        respond item, [status: CREATED, view:"show"]
    }

    def update(Item item) {
        if (item == null) {
            render status: NOT_FOUND
            return
        }

        try {
            itemService.save(item)
        } catch (ValidationException e) {
            respond item.errors, view:'edit'
            return
        }

        respond item, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        itemService.delete(id)

        render status: NO_CONTENT
    }
}
