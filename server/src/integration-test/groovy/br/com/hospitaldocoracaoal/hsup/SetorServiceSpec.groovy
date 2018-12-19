package br.com.hospitaldocoracaoal.hsup

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class SetorServiceSpec extends Specification {

    SetorService setorService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Setor(...).save(flush: true, failOnError: true)
        //new Setor(...).save(flush: true, failOnError: true)
        //Setor setor = new Setor(...).save(flush: true, failOnError: true)
        //new Setor(...).save(flush: true, failOnError: true)
        //new Setor(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //setor.id
    }

    void "test get"() {
        setupData()

        expect:
        setorService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Setor> setorList = setorService.list(max: 2, offset: 2)

        then:
        setorList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        setorService.count() == 5
    }

    void "test delete"() {
        Long setorId = setupData()

        expect:
        setorService.count() == 5

        when:
        setorService.delete(setorId)
        sessionFactory.currentSession.flush()

        then:
        setorService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Setor setor = new Setor()
        setorService.save(setor)

        then:
        setor.id != null
    }
}
