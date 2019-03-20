package br.com.hospitaldocoracaoal.hsup

class StatusSolicitacao {

    static final Long PENDENTE_ID = 1L
    static final Long APROVADA_ID = 2L
    static final Long CANCELADA_ID = 3L
    static final Long RECUSADA_ID = 4L
    static final Long EM_COTACAO_ID = 5L

    String nome

    static constraints = {
        nome nullable: false, blank: false
    }

    static mapping = {
        id generator: 'assigned'
        version false
    }

    static void criarStatusPadroes() {
        if (!exists(PENDENTE_ID)) {
            StatusSolicitacao pendente = new StatusSolicitacao(nome: 'Pendente')
            pendente.id = PENDENTE_ID
            pendente.save()
        }

        if (!exists(APROVADA_ID)) {
            StatusSolicitacao autorizada = new StatusSolicitacao(nome: 'Aprovada')
            autorizada.id = APROVADA_ID
            autorizada.save()
        }

        if (!exists(CANCELADA_ID)) {
            StatusSolicitacao cancelada = new StatusSolicitacao(nome: 'Cancelada')
            cancelada.id = CANCELADA_ID
            cancelada.save()
        }

        if (!exists(RECUSADA_ID)) {
            StatusSolicitacao recusada = new StatusSolicitacao(nome: 'Recusada')
            recusada.id = RECUSADA_ID
            recusada.save()
        }

        if (!exists(EM_COTACAO_ID)) {
            StatusSolicitacao emCotacao = new StatusSolicitacao(nome: 'Em Cotação')
            emCotacao.id = EM_COTACAO_ID
            emCotacao.save()
        }
    }
}
