package br.com.hospitaldocoracaoal.hsup

class StatusSolicitacao {

    static final Long AGUARDANDO_AUTORIZACAO_ID = 1L
    static final Long RECUSADA_ID = 2L
    static final Long VALIDACAO_ALMOXARIFE_ID = 3L
    static final Long PENDENTE_ID = 4L
    static final Long EM_COTACAO_ID = 5L
    static final Long AGUARDANDO_SOLICITANTE_ID = 6L
    static final Long AGUARDANDO_PRODUTO_ID = 7L
    static final Long ENTREGUE_ALMOXARIFADO_ID = 8L
    static final Long RETIRADO_ID = 9L
    static final Long CANCELADA_ID = 10L

    String nome

    static constraints = {
        nome nullable: false, blank: false
    }

    static mapping = {
        id generator: 'assigned'
        version false
    }

    static void criarStatusPadroes() {

        if (!exists(AGUARDANDO_AUTORIZACAO_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'aguardando autorização')
            status.id = AGUARDANDO_AUTORIZACAO_ID
            status.save()
        }

        if (!exists(RECUSADA_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'recusada')
            status.id = RECUSADA_ID
            status.save()
        }

        if (!exists(VALIDACAO_ALMOXARIFE_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'validação almoxarife')
            status.id = VALIDACAO_ALMOXARIFE_ID
            status.save()
        }

        if (!exists(PENDENTE_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'pendente')
            status.id = PENDENTE_ID
            status.save()
        }

        if (!exists(EM_COTACAO_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'em cotação')
            status.id = EM_COTACAO_ID
            status.save()
        }

        if (!exists(AGUARDANDO_SOLICITANTE_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'aguardando solicitante')
            status.id = AGUARDANDO_SOLICITANTE_ID
            status.save()
        }

        if (!exists(AGUARDANDO_PRODUTO_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'aguardando produto')
            status.id = AGUARDANDO_PRODUTO_ID
            status.save()
        }

        if (!exists(ENTREGUE_ALMOXARIFADO_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'entregue almoxarifado')
            status.id = ENTREGUE_ALMOXARIFADO_ID
            status.save()
        }

        if (!exists(RETIRADO_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'retirado')
            status.id = RETIRADO_ID
            status.save()
        }

        if (!exists(CANCELADA_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'cancelada')
            status.id = CANCELADA_ID
            status.save()
        }
    }
}