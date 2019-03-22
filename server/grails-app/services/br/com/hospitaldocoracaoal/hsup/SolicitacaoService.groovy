package br.com.hospitaldocoracaoal.hsup

import grails.gorm.PagedResultList
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

    PagedResultList<Solicitacao> list(Map args) {
        def criteria = Solicitacao.createCriteria()
        def principal = springSecurityService.principal
        Usuario usuarioLogado = Usuario.get principal.id

        List<Solicitacao> solicitacaoList = criteria.list(args) {
            if (!args.containsKey('sort')) {
                order('urgente', 'desc')
                order('dateCreated', 'asc')
            }

            responsavel {
                or {
                    eq('id', usuarioLogado.id)

                    setor {
                        gestor {
                            eq 'id', usuarioLogado.setor.gestorId
                        }
                    }
                }
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
            solicitacao.status = StatusSolicitacao.load StatusSolicitacao.AGUARDANDO_AUTORIZACAO_ID
        } else {
            solicitacao.status = StatusSolicitacao.load StatusSolicitacao.VALIDACAO_ALMOXARIFE_ID
        }

        solicitacao.itens.item.each {
            it.fabricante = it.fabricante.unique { a, b -> a.fantasia <=> b.fantasia }
            def newFab = it.fabricante.findAll { it.id == null }

            newFab.each {
                Fabricante fabricante = Fabricante.findByFantasia it.fantasia
                if (fabricante == null) it.save()
            }

            it.fornecedor = it.fornecedor.unique { a, b -> a.fantasia <=> b.fantasia }
            def newForn = it.fornecedor.findAll { it.id == null }

            newForn.each {
                Fornecedor fornecedor = Fornecedor.findByFantasia it.fantasia
                if (fornecedor == null) it.save()
            }

            solicitacao.itens.item.unique { a, b -> a.descricao <=> b.descricao }
            def newItem = solicitacao.itens.item.findAll { it.id == null }

            newItem.each {
                Item item = Item.findByDescricao it.descricao
                if (item == null) it.save()
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
            if (status != StatusSolicitacao.RECUSADA_ID && status != StatusSolicitacao.CANCELADA_ID && StatusSolicitacao.RETIRADO_ID) {
                solicitacao.save flush: true
            }
        }
    }
}