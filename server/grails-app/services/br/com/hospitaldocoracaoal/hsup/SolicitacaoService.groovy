package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service
import grails.plugin.springsecurity.SpringSecurityService
import grails.validation.ValidationException
import org.springframework.beans.factory.annotation.Autowired

@Service(Solicitacao)
abstract class SolicitacaoService {

    @Autowired FollowUpService followUpService
    @Autowired SpringSecurityService springSecurityService

    abstract Solicitacao get(Serializable id)

    abstract List<Solicitacao> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    Solicitacao save(Solicitacao solicitacao) {
        if (solicitacao == null) {
            throw new IllegalArgumentException('Solicitação deve ser diferente de null')
        }

        if (!solicitacao.validate()) {
            throw new ValidationException('Erro de validação na solicitação', solicitacao.errors)
        }

        boolean statusAlterado = solicitacao.id != null && solicitacao.isDirty('status')

        Solicitacao solicitacaoSalva = solicitacao.save()

        if (statusAlterado) {
            def principal = springSecurityService.principal
            if (principal == null) throw new IllegalStateException('Deve ter um usuários autenticado')

            Usuario usuarioLogado = Usuario.get principal.id

            followUpService.enviarFollowUp solicitacao
            def test = new SolicitacaoHistorico(
                    solicitacao: solicitacao,
                    status: solicitacao.status,
                    usuario: usuarioLogado
            )

            test.validate()
            test.save flush: true
        }

        solicitacaoSalva
    }
}