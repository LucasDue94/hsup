package br.com.hospitaldocoracaoal.hsup

import br.com.hospitaldocoracaoal.hsup.integracao.Produto

class Item {
    String descricao
    Boolean ativo
    Produto produto

    static hasMany = [fabricante: Fabricante, fornecedor: Fornecedor]

    static mapping = {
        id generator: 'foreign', params: [property: 'produto']
    }

    static constraints = {
        descricao nullable: false, blank: false
        produto nullable: true
        ativo nullable: false, blank: false
    }
}
