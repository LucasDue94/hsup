package br.com.hospitaldocoracaoal.hsup

class Solicitacao {

    Usuario responsavel
    Setor setor
    Date data
    static hasMany = [itens: SolicitacaoItem]

    static constraints = {
        responsavel nullable: false, blank: false
        setor nullable: false, blank: false
        data nullable: false, blank: false
    }
}