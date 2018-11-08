package br.com.hospitaldocoracaoal.hsup

class Fornecedor {

    String fantasia
    String telefone
    String endereco
    String email
    Boolean ativo

    static constraints = {
        fantasia nullable: false, blank: false
        ativo nullable: false, blank: false
        telefone nullable: false, blank: false
        endereco nullable: false, blank: false
        email nullable: false, blank: false
    }
}
