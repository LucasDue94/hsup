package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service
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
                if (fab != null && !Fabricante.exists(fab.id) && fabricante == null) {
                    fab.save(flush: true)
                }

                if (fabricante) {
                    it.addToFabricante(fabricante)
                }
            }

            it.fornecedor.each { forn ->
                Fornecedor fornecedor = Fornecedor.findByFantasia(forn.fantasia)
                if (forn != null && !Fornecedor.exists(forn.id) && fornecedor == null) {
                    forn.save(flush: true)
                }

                if (fornecedor) {
                    it.addToFornecedor(fornecedor)
                }
            }

            if (it != null && !Item.exists(it.id) && !Item.findByDescricao(it.descricao)) {
                it.save(flush: true)
            }
        }

        solicitacao.save()

        solicitacao.itens.each { it ->
            it.item.each { item ->
                item.fornecedor.each { forn ->
                    if (forn != null) {
                        it.addToFornecedor(forn)
                    }
                }

                item.fabricante.each { fab ->
                    if (fab != null) {
                        it.addToFabricante(fab)
                    }
                }
            }

            it.save(flush: true)
        }

        solicitacao
    }
}