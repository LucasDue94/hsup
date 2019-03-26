package br.com.hospitaldocoracaoal.hsup

import br.com.hospitaldocoracaoal.hsup.integracao.Produto

class Item {
    String descricao
    Boolean ativo
    Produto produto

    static hasMany = [fabricante: Fabricante, fornecedor: Fornecedor]

    static constraints = {
        descricao nullable: false, blank: false, unique: true
        produto nullable: true
        ativo nullable: false, blank: false
    }
}
