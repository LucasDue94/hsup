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
            if (it != null && !Item.exists(it.id)) {
                it.save(flush: true)
            }
        }

        solicitacao.save()

        solicitacao.itens.each { it ->
            it.save(flush: true)
        }

        solicitacao
    }

}