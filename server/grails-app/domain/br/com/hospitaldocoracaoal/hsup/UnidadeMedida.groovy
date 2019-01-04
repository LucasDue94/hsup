package br.com.hospitaldocoracaoal.hsup

class UnidadeMedida {

    String descricao

    static belongsTo = Item

    static constraints = {
        descricao nullable: false, blank: false, unique: true
    }
}