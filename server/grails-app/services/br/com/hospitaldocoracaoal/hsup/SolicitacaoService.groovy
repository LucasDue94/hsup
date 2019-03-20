package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service
import grails.plugin.springsecurity.SpringSecurityService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.transaction.annotation.Transactional

@Service(Solicitacao)
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

    @Transactional
    Solicitacao save(Solicitacao solicitacao) {
        if (solicitacao == null) {
            throw new IllegalArgumentException("Solicitação não pode ser nula.")
        }

        solicitacao.itens.item.each { it ->
            it.fabricante.each { fab ->
                Fabricante fabricante = Fabricante.findByFantasia(fab.fantasia)

                if (fabricante == null && fab.id == null) {
                    fab.save()
                    it.addToFabricante(fab)
                } else {
                    it.addToFabricante(fabricante)
                }
            }

            it.fornecedor.each { forn ->
                Fornecedor fornecedor = Fornecedor.findByFantasia(forn.fantasia)
                if (fornecedor == null) {
                    forn.save()
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

    @Transactional
    changeStatus(Solicitacao solicitacao) {
        if (solicitacao.isDirty('status')) {
            solicitacao.save()
            createHistorico(solicitacao)
        }
    }

    @Transactional
    createHistorico(Solicitacao solicitacao) {
        if (solicitacao.status) {
            def principal = springSecurityService.principal
            if (principal == null) throw new IllegalStateException('Deve ter um usuário logado.')

            Usuario usuarioLogado = Usuario.get principal.id

            def historico = [
                    solicitacao: solicitacao,
                    usuario    : usuarioLogado,
                    status     : solicitacao.status
            ]

            SolicitacaoHistorico solicitacaoHistorico = SolicitacaoHistorico.findOrCreateWhere(historico)
            solicitacaoHistorico.save(flush: true)
        }
    }
}