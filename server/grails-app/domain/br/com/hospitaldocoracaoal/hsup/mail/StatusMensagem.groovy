package br.com.hospitaldocoracaoal.hsup.mail

class StatusMensagem {

    static final Long AGENDADA_ID = 1L
    static final Long ENVIADA_ID = 2L
    static final Long FALHA_ENVIAR_ID = 3L
    static final Long CANCELADA_ID = 4L

    String nome

    static constraints = {
        nome nullable: false, blank: false
    }

    static mapping = {
        id generator: 'assigned'
        version false
    }

    static criarStatusPadroes() {
        if (exists(AGENDADA_ID) == null) {
            StatusMensagem agendada = new StatusMensagem(nome: 'Agendada')
            agendada.id = AGENDADA_ID
            agendada.save()
        }

        if (exists(ENVIADA_ID) == null) {
            StatusMensagem enviada = new StatusMensagem(nome: 'Enviada')
            enviada.id = ENVIADA_ID
            enviada.save()
        }

        if (exists(FALHA_ENVIAR_ID) == null) {
            StatusMensagem falha = new StatusMensagem(nome: 'Falha ao enviarFollowUp')
            falha.id = FALHA_ENVIAR_ID
            falha.save()
        }

        if (exists(CANCELADA_ID) == null) {
            StatusMensagem cancelada = new StatusMensagem(nome: 'Cancelada')
            cancelada.id = CANCELADA_ID
            cancelada.save()
        }
    }
}
