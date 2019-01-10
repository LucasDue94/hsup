package br.com.hospitaldocoracaoal.hsup

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class SolicitacaoServiceSpec extends Specification {

    SolicitacaoService solicitacaoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Solicitacao(...).save(flush: true, failOnError: true)
        //new Solicitacao(...).save(flush: true, failOnError: true)
        //Solicitacao solicitacao = new Solicitacao(...).save(flush: true, failOnError: true)
        //new Solicitacao(...).save(flush: true, failOnError: true)
        //new Solicitacao(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //solicitacao.id
    }

    void "test get"() {
        setupData()

        expect:
        solicitacaoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Solicitacao> solicitacaoList = solicitacaoService.list(max: 2, offset: 2)

        then:
        solicitacaoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        solicitacaoService.count() == 5
    }

    void "test delete"() {
        Long solicitacaoId = setupData()

        expect:
        solicitacaoService.count() == 5

        when:
        solicitacaoService.delete(solicitacaoId)
        sessionFactory.currentSession.flush()

        then:
        solicitacaoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Solicitacao solicitacao = new Solicitacao()
        solicitacaoService.save(solicitacao)

        then:
        solicitacao.id != null
    }
}
