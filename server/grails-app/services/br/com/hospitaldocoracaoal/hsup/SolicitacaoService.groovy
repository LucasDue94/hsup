package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service
import grails.plugin.springsecurity.SpringSecurityService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.transaction.annotation.Transactional

@Service(Solicitacao)
@Transactional
abstract class SolicitacaoService {

    @Autowired
    SpringSecurityService springSecurityService

    abstract Solicitacao get(Serializable id)

    List<Solicitacao> list(Map args) {
        def criteria = Solicitacao.createCriteria()
        List<Solicitacao> solicitacaoList = (List<Solicitacao>) criteria.list(args) {
            if (!args.containsKey('sort')) {
                order('urgente', 'desc')
                order('dateCreated', 'asc')
            }
        }

        return solicitacaoList
    }

    abstract Long count()

    abstract void delete(Serializable id)

    Solicitacao save(Solicitacao solicitacao) {
        if (solicitacao == null) {
            throw new IllegalArgumentException("Solicitação não pode ser nula.")
        }

        if (solicitacao.responsavel.setor.necessitaAutorizacao) {
            solicitacao.status = StatusSolicitacao.load
        }

        solicitacao.itens.item.each {
            it.fabricante = it.fabricante.unique { a, b -> a.fantasia <=> b.fantasia }
            def newFab = it.fabricante.findAll { it.id == null }
            newFab*.save()

            it.fornecedor = it.fornecedor.unique { a, b -> a.fantasia <=> b.fantasia }
            def newForn = it.fornecedor.findAll { it.id == null }
            newForn*.save()

            if (!Item.findByDescricao(it.descricao)) {
                it.save()
            }
        }

        solicitacao.save()

        solicitacao.itens.each {
            it.item.each { item ->
                if (item.fornecedor.size() > 0) {
                    it.addToFornecedor(item.fornecedor)
                }

                if (item.fabricante.size() > 0) {
                    it.addToFabricante(item.fabricante)
                }
            }

            it.save()
        }

        createHistorico(solicitacao)
        solicitacao
    }

    void createHistorico(Solicitacao solicitacao) {
        if (solicitacao.status) {
            def principal = springSecurityService.principal
            if (principal == null) throw new IllegalStateException('Deve ter um usuário logado.')

            Usuario usuarioLogado = Usuario.load principal.id

            def historico = [
                    solicitacao: solicitacao,
                    usuario    : usuarioLogado,
                    status     : solicitacao.status
            ]

            SolicitacaoHistorico solicitacaoHistorico = SolicitacaoHistorico.findOrCreateWhere(historico)
            solicitacaoHistorico.save(flush: true)
        }
    }

    void cancel(Serializable id) {
        def solicitacao = Solicitacao.get id
        def statusCancelado = StatusSolicitacao.load StatusSolicitacao.CANCELADA_ID
        solicitacao.status = statusCancelado
        solicitacao.save()
        createHistorico(solicitacao)
    }

    void deny(Serializable id) {
        def solicitacao = Solicitacao.get id
        def statusRecusado = StatusSolicitacao.get StatusSolicitacao.RECUSADA_ID
        solicitacao.status = statusRecusado
        solicitacao.save()
        createHistorico(solicitacao)
    }

    void approval(Serializable id) {
        def solicitacao = Solicitacao.get id
        def statusAprovado = StatusSolicitacao.get StatusSolicitacao.APROVADA_ID
        solicitacao.status = statusAprovado
        solicitacao.save()
        createHistorico(solicitacao)
    }

    void changeStatus(Solicitacao solicitacao) {
        if (solicitacao.isDirty('status')) {
            def status = solicitacao?.status?.id
            if (status != StatusSolicitacao.RECUSADA_ID && status != StatusSolicitacao.CANCELADA_ID) {
                solicitacao.save flush: true
            }
        }
    }
}