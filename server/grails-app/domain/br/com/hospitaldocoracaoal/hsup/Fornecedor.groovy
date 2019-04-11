package br.com.hospitaldocoracaoal.hsup

class Fornecedor {

    String fantasia
    String telefone
    String email
    Boolean ativo

    static belongsTo = Item

    static constraints = {
        fantasia nullable: false, blank: false, unique: true
        ativo nullable: false
        telefone nullable: true
        email nullable: true
    }
}
