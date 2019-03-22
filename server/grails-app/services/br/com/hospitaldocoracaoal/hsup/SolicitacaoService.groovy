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

        solicitacao.itens.item.each { it ->
            it.fabricante.each { fab ->
                Fabricante fabricante = Fabricante.findByFantasia(fab.fantasia)
                if (fabricante == null) {
                    fab.save(flush: true)
                } else {
                    if (it.fabricante.contains(fabricante)) return
                    it.addToFabricante(fabricante)
                    it.fabricante.remove(fab)
                }
            }

            it.fornecedor.each { forn ->
                Fornecedor fornecedor = Fornecedor.findByFantasia(forn.fantasia)
                if (fornecedor == null) {
                    forn.save(flush: true)
                } else {
                    it.addToFornecedor(fornecedor)
                    it.fornecedor.remove(forn)
                }
            }

            if (!Item.findByDescricao(it.descricao)) {
                it.save(flush: true)
            }
        }

        solicitacao.save()

        solicitacao.itens.each { it ->
            it.item.each { item ->
                if (item.fornecedor.size() > 0) {
                    it.addToFornecedor(item.fornecedor)
                }

                if (item.fabricante.size() > 0) {
                    it.addToFabricante(item.fabricante)
                }
            }

            it.save(flush: true)
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
        def status = StatusSolicitacao.load StatusSolicitacao.CANCELADA_ID
        solicitacao.status = status
        solicitacao.save()
        createHistorico(solicitacao)
    }

    void deny(Serializable id) {
        def solicitacao = Solicitacao.get id
        def status = StatusSolicitacao.get StatusSolicitacao.RECUSADA_ID
        solicitacao.status = status
        solicitacao.save()
        createHistorico(solicitacao)
    }

    void approval(Serializable id) {
        def solicitacao = Solicitacao.get id
        def status = StatusSolicitacao.get StatusSolicitacao.VALIDACAO_ALMOXARIFE_ID
        solicitacao.status = status
        solicitacao.save()
        createHistorico(solicitacao)
    }

    void collect(Serializable id) {
        def solicitacao = Solicitacao.get id
        def status = StatusSolicitacao.get StatusSolicitacao.RETIRADO_ID
        solicitacao.status = status
        solicitacao.save()
        createHistorico(solicitacao)
    }


    void validaAlmoxarife(Serializable id) {
        def solicitacao = Solicitacao.get id
        if (solicitacao.status.id == StatusSolicitacao.VALIDACAO_ALMOXARIFE_ID) {
            def status = StatusSolicitacao.get StatusSolicitacao.PENDENTE_ID
            solicitacao.status = status
            solicitacao.save()
            createHistorico(solicitacao)
        }
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