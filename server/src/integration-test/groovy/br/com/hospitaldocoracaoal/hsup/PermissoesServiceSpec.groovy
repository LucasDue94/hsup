package br.com.hospitaldocoracaoal.hsup

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class PermissoesServiceSpec extends Specification {

    PermissoesService permissoesService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Permissoes(...).save(flush: true, failOnError: true)
        //new Permissoes(...).save(flush: true, failOnError: true)
        //Permissoes permissoes = new Permissoes(...).save(flush: true, failOnError: true)
        //new Permissoes(...).save(flush: true, failOnError: true)
        //new Permissoes(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //permissoes.id
    }

    void "test get"() {
        setupData()

        expect:
        permissoesService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Permissoes> permissoesList = permissoesService.list(max: 2, offset: 2)

        then:
        permissoesList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        permissoesService.count() == 5
    }

    void "test delete"() {
        Long permissoesId = setupData()

        expect:
        permissoesService.count() == 5

        when:
        permissoesService.delete(permissoesId)
        sessionFactory.currentSession.flush()

        then:
        permissoesService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Permissoes permissoes = new Permissoes()
        permissoesService.save(permissoes)

        then:
        permissoes.id != null
    }
}
