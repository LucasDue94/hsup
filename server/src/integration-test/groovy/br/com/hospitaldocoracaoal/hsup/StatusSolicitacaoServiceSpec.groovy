package br.com.hospitaldocoracaoal.hsup

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class StatusSolicitacaoServiceSpec extends Specification {

    StatusSolicitacaoService statusSolicitacaoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new StatusSolicitacao(...).save(flush: true, failOnError: true)
        //new StatusSolicitacao(...).save(flush: true, failOnError: true)
        //StatusSolicitacao statusSolicitacao = new StatusSolicitacao(...).save(flush: true, failOnError: true)
        //new StatusSolicitacao(...).save(flush: true, failOnError: true)
        //new StatusSolicitacao(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //statusSolicitacao.id
    }

    void "test get"() {
        setupData()

        expect:
        statusSolicitacaoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<StatusSolicitacao> statusSolicitacaoList = statusSolicitacaoService.list(max: 2, offset: 2)

        then:
        statusSolicitacaoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        statusSolicitacaoService.count() == 5
    }

    void "test delete"() {
        Long statusSolicitacaoId = setupData()

        expect:
        statusSolicitacaoService.count() == 5

        when:
        statusSolicitacaoService.delete(statusSolicitacaoId)
        sessionFactory.currentSession.flush()

        then:
        statusSolicitacaoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        StatusSolicitacao statusSolicitacao = new StatusSolicitacao()
        statusSolicitacaoService.save(statusSolicitacao)

        then:
        statusSolicitacao.id != null
    }
}
