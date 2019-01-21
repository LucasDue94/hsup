package br.com.hospitaldocoracaoal.hsup

class StatusSolicitacao {

    static final Long PENDENTE_ID = 1L
    static final Long AUTORIZADA_ID = 2L

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
            StatusSolicitacao pendete = new StatusSolicitacao(nome: 'Pendente')
            pendete.id = PENDENTE_ID
            pendete.save()
        }

        if (!exists(AUTORIZADA_ID)) {
            StatusSolicitacao autorizada = new StatusSolicitacao(nome: 'Autorizada')
            autorizada.id = AUTORIZADA_ID
            autorizada.save()
        }
    }
}
