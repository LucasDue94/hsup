package br.com.hospitaldocoracaoal.hsup

import grails.gorm.services.Service

@Service(StatusSolicitacao)
abstract class StatusSolicitacaoService {

    abstract StatusSolicitacao get(Serializable id)

    List<StatusSolicitacao> list(Map args, String termo) {
        def criteria = StatusSolicitacao.createCriteria()
        List<StatusSolicitacao> statusSolicitacaoList = (List<StatusSolicitacao>) criteria.list(args) {
            if (termo != null && !termo.isEmpty()) {
                or {
                    ilike('id', "%${termo}%")
                    ilike('nome', "%${termo}%")
                }
            }
        }

        return statusSolicitacaoList
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract StatusSolicitacao save(StatusSolicitacao statusSolicitacao)

}