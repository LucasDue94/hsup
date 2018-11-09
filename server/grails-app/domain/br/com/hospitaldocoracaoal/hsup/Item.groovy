package br.com.hospitaldocoracaoal.hsup

class Item {

    String descricao
    String unidadeMedida

    static hasMany = [fabricante: Fabricante, fornecedor: Fornecedor]

    static constraints = {
        descricao nullable: false, blank: false
        unidadeMedida nullable: false, blank: false
    }
}
