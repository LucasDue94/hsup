package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service

@Service(Fabricante)
abstract class FabricanteService {

    abstract Fabricante get(Serializable id)

    List<Fabricante> list(Map args, String termo) {
        def criteria = Fabricante.createCriteria()
        List<Fabricante> fabricanteList = (List<Fabricante>) criteria.list(args) {
            if (termo != null && !termo.isEmpty()) {
                or {
                    ilike('fantasia', "%${termo}%")
                }
            }
        }

        return fabricanteList
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Fabricante save(Fabricante fabricante)
}