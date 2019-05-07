package br.com.hospitaldocoracaoal.hsup

class SolicitacaoHistorico {

    Date dateCreated
    Solicitacao solicitacao
    StatusSolicitacao status
    Usuario usuario

    static constraints = {
        solicitacao nullable: false
        status nullable: false
        usuario nullable: false
    }
}
