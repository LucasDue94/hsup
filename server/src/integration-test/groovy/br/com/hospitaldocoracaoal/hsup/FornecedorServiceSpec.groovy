package br.com.hospitaldocoracaoal.hsup

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class FornecedorServiceSpec extends Specification {

    FornecedorService fornecedorService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Fornecedor(...).save(flush: true, failOnError: true)
        //new Fornecedor(...).save(flush: true, failOnError: true)
        //Fornecedor fornecedor = new Fornecedor(...).save(flush: true, failOnError: true)
        //new Fornecedor(...).save(flush: true, failOnError: true)
        //new Fornecedor(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //fornecedor.id
    }

    void "test get"() {
        setupData()

        expect:
        fornecedorService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Fornecedor> fornecedorList = fornecedorService.list(max: 2, offset: 2)

        then:
        fornecedorList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        fornecedorService.count() == 5
    }

    void "test delete"() {
        Long fornecedorId = setupData()

        expect:
        fornecedorService.count() == 5

        when:
        fornecedorService.delete(fornecedorId)
        sessionFactory.currentSession.flush()

        then:
        fornecedorService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Fornecedor fornecedor = new Fornecedor()
        fornecedorService.save(fornecedor)

        then:
        fornecedor.id != null
    }
}
