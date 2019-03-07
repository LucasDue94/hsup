package br.com.hospitaldocoracaoal.hsup

import br.com.hospitaldocoracaoal.hsup.integracao.Produto
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

class ItemController {

    ItemService itemService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Secured('ROLE_ITEM_INDEX')
    def index(Integer max, String termo) {
        params.max = Math.min(max ?: 10, 100)
        List<Item> itemList = itemService.list(params, termo)
        return respond(itemList)
    }

    @Secured('ROLE_ITEM_SHOW')
    def show(Long id) {
        respond itemService.get(id)
    }

    @Secured('ROLE_ITEM_UPDATE')
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

    @Secured('ROLE_ITEM_SAVE')
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

    @Secured('ROLE_ITEM_DELETE')
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        itemService.delete(id)
        render status: NO_CONTENT
    }
}
