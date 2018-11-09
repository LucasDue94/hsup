package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service

@Service(Item)
interface ItemService {

    Item get(Serializable id)

    List<Item> list(Map args)

    Long count()

    void delete(Serializable id)

    Item save(Item item)

}