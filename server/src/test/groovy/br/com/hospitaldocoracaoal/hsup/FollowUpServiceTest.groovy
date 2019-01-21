package br.com.hospitaldocoracaoal.hsup

import br.com.hospitaldocoracaoal.hsup.mail.Mensagem
import br.com.hospitaldocoracaoal.hsup.mail.StatusMensagem
import grails.testing.mixin.integration.Integration
import org.springframework.test.annotation.Rollback
import spock.lang.Specification

@Integration
@Rollback
class FollowUpServiceTest extends Specification {

    Long solicitacaoId

    FollowUpService followUpService

    def setup() {
        Solicitacao.withTransaction {
            final Usuario admin = Usuario.findByUsername'admin'
            final Setor setorAdmin = Setor.findByNome 'Administração'
            final Solicitacao solicitacao = new Solicitacao(
                    responsavel: admin,
                    setor: setorAdmin,
                    data: new Date(),
                    urgente: false,
                    autenticacao: setorAdmin.autenticacao
            )

            solicitacao.save flush: true

            this.solicitacaoId = solicitacao.id
        }
    }

    def cleanup() {
        Solicitacao.withTransaction {
            Solicitacao solicitacao = Solicitacao.get solicitacaoId
            Mensagem mensagem = Mensagem.findBySolicitacao solicitacao
            mensagem.delete()
            solicitacao.delete flush: true
        }
    }

    void "testar agendamento de mensagem"() {
        when: 'Solicitar envio de follow-up'
        Mensagem mensagem
        Solicitacao.withTransaction {
            final Solicitacao solicitacao = Solicitacao.get this.solicitacaoId
            followUpService.enviarFollowUp solicitacao

            mensagem = Mensagem.findBySolicitacao solicitacao
        }

        then: 'Deve existir uma mensagem para a solicitação com Status Agendada'
        mensagem != null
        mensagem.solicitacaoId == this.solicitacaoId
        mensagem.statusId == StatusMensagem.AGENDADA_ID
    }
}
