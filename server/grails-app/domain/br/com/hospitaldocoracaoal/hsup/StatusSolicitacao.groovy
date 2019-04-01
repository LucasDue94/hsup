package br.com.hospitaldocoracaoal.hsup

class StatusSolicitacao {

    static final Long AGUARDANDO_AUTORIZACAO_ID = 1L
    static final Long RECUSADA_ID = 2L
    static final Long VALIDACAO_ALMOXARIFE_ID = 3L
    static final Long PENDENTE_ID = 4L
    static final Long EM_COTACAO_ID = 5L
    static final Long AGUARDANDO_SOLICITANTE_ID = 6L
    static final Long AGUARDANDO_PRODUTO_ID = 7L
    static final Long RECEBIDO_ALMOXARIFADO_ID = 8L
    static final Long RETIRADO_ID = 9L
    static final Long CANCELADA_ID = 10L

    String nome
    Integer peso
    static hasMany = [statusPermitido: StatusSolicitacao]

    static constraints = {
        nome nullable: false, blank: false
        peso nullable: false, blank: false
    }

    static mapping = {
        statusPermitido joinTable: [name: 'status_permitidos', key: 'id']
        id generator: 'assigned'
        version false
    }

    static void criarStatusPadroes() {

        if (!exists(AGUARDANDO_AUTORIZACAO_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'aguardando autorização')
            status.id = AGUARDANDO_AUTORIZACAO_ID
            status.peso = 100
            status.save()
        }

        if (!exists(RECUSADA_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'recusada')
            status.id = RECUSADA_ID
            status.peso = 20
            status.save()
        }

        if (!exists(VALIDACAO_ALMOXARIFE_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'validação almoxarife')
            status.id = VALIDACAO_ALMOXARIFE_ID
            status.peso = 90
            status.save()
        }

        if (!exists(PENDENTE_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'pendente')
            status.id = PENDENTE_ID
            status.peso = 80
            status.save()
        }

        if (!exists(EM_COTACAO_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'em cotação')
            status.id = EM_COTACAO_ID
            status.peso = 70
            status.save()
        }

        if (!exists(AGUARDANDO_SOLICITANTE_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'aguardando solicitante')
            status.id = AGUARDANDO_SOLICITANTE_ID
            status.peso = 60
            status.save()
        }

        if (!exists(AGUARDANDO_PRODUTO_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'aguardando produto')
            status.id = AGUARDANDO_PRODUTO_ID
            status.peso = 50
            status.save()
        }

        if (!exists(RECEBIDO_ALMOXARIFADO_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'recebido almoxarifado')
            status.id = RECEBIDO_ALMOXARIFADO_ID
            status.peso = 40
            status.save()
        }

        if (!exists(RETIRADO_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'retirado')
            status.id = RETIRADO_ID
            status.peso = 30
            status.save()
        }

        if (!exists(CANCELADA_ID)) {
            StatusSolicitacao status = new StatusSolicitacao(nome: 'cancelada')
            status.id = CANCELADA_ID
            status.peso = 10
            status.save()
        }
    }

    static void attachStatus() {


        StatusSolicitacao aguardandoAutorizacao = get AGUARDANDO_AUTORIZACAO_ID
        StatusSolicitacao recusada = get RECUSADA_ID
        StatusSolicitacao validacaoAlmoxarife = get VALIDACAO_ALMOXARIFE_ID
        StatusSolicitacao pendente = get PENDENTE_ID
        StatusSolicitacao aguardandoSolicitante = get AGUARDANDO_SOLICITANTE_ID
        StatusSolicitacao aguardandoProduto = get AGUARDANDO_PRODUTO_ID
        StatusSolicitacao retirado = get RETIRADO_ID
        StatusSolicitacao emCotacao = get EM_COTACAO_ID
        StatusSolicitacao cancelada = get CANCELADA_ID
        StatusSolicitacao recebidoAlmoxarifado = get RECEBIDO_ALMOXARIFADO_ID

        aguardandoAutorizacao.addToStatusPermitido(recusada)
        aguardandoAutorizacao.addToStatusPermitido(cancelada)
        aguardandoAutorizacao.addToStatusPermitido(validacaoAlmoxarife)

        validacaoAlmoxarife.addToStatusPermitido(cancelada)
        validacaoAlmoxarife.addToStatusPermitido(pendente)

        emCotacao.addToStatusPermitido(cancelada)
        emCotacao.addToStatusPermitido(aguardandoAutorizacao)

        aguardandoSolicitante.addToStatusPermitido(cancelada)
        aguardandoSolicitante.addToStatusPermitido(aguardandoProduto)

        aguardandoProduto.addToStatusPermitido(recebidoAlmoxarifado)

        pendente.addToStatusPermitido(cancelada)
        pendente.addToStatusPermitido(emCotacao)
    }
}