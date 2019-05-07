package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service

@Service(Item)
abstract class ItemService {

    abstract Item get(Serializable id)

    List<Item> list(Map args, String termo) {
        def criteria = Item.createCriteria()
        List<Item> itemList = (List<Item>) criteria.list(args) {
            if (termo != null && !termo.isEmpty()) {
                or {
                    ilike('descricao', "%${termo}%")
                }
            }
        }

        return itemList
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Item save(Item item)

}