package br.com.hospitaldocoracaoal.hsup

class Item {

    String descricao
    Boolean ativo

    static hasMany = [fabricante: Fabricante, fornecedor: Fornecedor, unidadeMedida: UnidadeMedida]

    static constraints = {
        descricao nullable: false, blank: false
        unidadeMedida nullable: false, blank: false
        ativo nullable: false, blank: false
    }
}
