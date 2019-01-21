package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service

@Service(Solicitacao)
interface SolicitacaoService {

    Solicitacao get(Serializable id)

    List<Solicitacao> list(Map args)

    Long count()

    void delete(Serializable id)

    Solicitacao save(Solicitacao solicitacao)

}