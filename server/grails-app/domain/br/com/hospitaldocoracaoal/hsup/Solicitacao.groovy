package br.com.hospitaldocoracaoal.hsup

class Solicitacao {

    Usuario responsavel
    Date dateCreated
    Boolean urgente
    StatusSolicitacao status

    static hasMany = [itens: SolicitacaoItem]

    static constraints = {
        urgente nullable: false, blank: false
        responsavel nullable: false, blank: false
    }
}