package br.com.hospitaldocoracaoal.hsup

class Fornecedor {

    String fantasia
    String telefone
    String email
    Boolean ativo

    static belongsTo = Item

    static constraints = {
        fantasia nullable: false, blank: false, unique: true
        ativo nullable: false, blank: false
        telefone nullable: false, blank: false
        email nullable: false, blank: false
    }
}
