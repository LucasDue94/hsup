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
        solicitacao.itens.each {item ->
            if (Item.find(item)) {

            }
        }
    }

}