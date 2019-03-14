package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service
import grails.plugin.springsecurity.SpringSecurityService
import org.springframework.transaction.annotation.Transactional

@Service(Solicitacao)
abstract class SolicitacaoService {

    abstract Solicitacao get(Serializable id)

    abstract List<Solicitacao> list(Map args)

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
                if (fabricante == null) {
                    fab.save(flush: true)
                } else {
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

        boolean status = solicitacao.id != null && solicitacao.isDirty('status')

        if (status) {
            

            def historico = [
                    solicitacao: solicitacao,
                    usuario:
            ]
        }

        SolicitacaoHistorico solicitacaoHistorico = SolicitacaoHistorico.findOrSaveWhere()
        solicitacao
    }

}