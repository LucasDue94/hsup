package br.com.hospitaldocoracaoal.hsup

class Setor {

    String nome
    Boolean autenticacao

    static constraints = {
        nome nullable: false, blank: false
        autenticacao nullable: false, blank: false
    }
}
