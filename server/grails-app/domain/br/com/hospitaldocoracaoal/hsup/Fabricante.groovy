package br.com.hospitaldocoracaoal.hsup

class Fabricante {

    String fantasia
    Boolean ativo

    static belongsTo = [Item, SolicitacaoItem]

    static constraints = {
        fantasia nullable: false, blank: false
        ativo nullable: false, blank: false
    }
}