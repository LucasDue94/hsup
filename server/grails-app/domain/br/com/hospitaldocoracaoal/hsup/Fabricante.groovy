package br.com.hospitaldocoracaoal.hsup

class Fabricante {

    String fantasia
    Boolean ativo

    static belongsTo = [Item, SolicitacaoItem]

    static constraints = {
        fantasia nullable: false, blank: false, unique: true
        ativo nullable: false, blank: false
    }
}