package br.com.hospitaldocoracaoal.hsup

class Item {

    String descricao
    String unidadeMedida
    Boolean ativo

    static hasMany = [fabricante: Fabricante, fornecedor: Fornecedor]

    static constraints = {
        descricao nullable: false, blank: false
        unidadeMedida nullable: false, blank: false
        ativo nullable: false, blank: false
    }
}
