package br.com.hospitaldocoracaoal.hsup

class Solicitacao {

    Usuario responsavel
    Setor setor
    Date data
    Boolean urgente
    static hasMany = [itens: SolicitacaoItem]

    static constraints = {
        urgente nullable: false, blank: false
        responsavel nullable: false, blank: false
        setor nullable: false, blank: false
        data nullable: false, blank: false
    }
}