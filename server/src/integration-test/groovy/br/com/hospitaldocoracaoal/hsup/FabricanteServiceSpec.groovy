package br.com.hospitaldocoracaoal.hsup

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class FabricanteServiceSpec extends Specification {

    FabricanteService fabricanteService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Fabricante(...).save(flush: true, failOnError: true)
        //new Fabricante(...).save(flush: true, failOnError: true)
        //Fabricante fabricante = new Fabricante(...).save(flush: true, failOnError: true)
        //new Fabricante(...).save(flush: true, failOnError: true)
        //new Fabricante(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //fabricante.id
    }

    void "test get"() {
        setupData()

        expect:
        fabricanteService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Fabricante> fabricanteList = fabricanteService.list(max: 2, offset: 2)

        then:
        fabricanteList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        fabricanteService.count() == 5
    }

    void "test delete"() {
        Long fabricanteId = setupData()

        expect:
        fabricanteService.count() == 5

        when:
        fabricanteService.delete(fabricanteId)
        sessionFactory.currentSession.flush()

        then:
        fabricanteService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Fabricante fabricante = new Fabricante()
        fabricanteService.save(fabricante)

        then:
        fabricante.id != null
    }
}
