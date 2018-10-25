package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service

@Service(Fabricante)
interface FabricanteService {

    Fabricante get(Serializable id)

    List<Fabricante> list(Map args)

    Long count()

    void delete(Serializable id)

    Fabricante save(Fabricante fabricante)

}