package br.com.hospitaldocoracaoal.hsup

class StatusSolicitacao {

    static final Long PENDENTE_ID = 1L
    static final Long AUTORIZADA_ID = 2L
    static final Long CANCELADA_ID = 3L
    static final Long RECUSADA_ID = 4L

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

        if (!exists(AUTORIZADA_ID)) {
            StatusSolicitacao autorizada = new StatusSolicitacao(nome: 'Aprovada')
            autorizada.id = AUTORIZADA_ID
            autorizada.save()
        }

        if (!exists(CANCELADA_ID)) {
            StatusSolicitacao cancelada = new StatusSolicitacao(nome: 'Cancelada')
            cancelada.id = AUTORIZADA_ID
            cancelada.save()
        }

        if (!exists(RECUSADA_ID)) {
            StatusSolicitacao recusada = new StatusSolicitacao(nome: 'Recusada')
            recusada.id = RECUSADA_ID
            recusada.save()
        }
    }
}
