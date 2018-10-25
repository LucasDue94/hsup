package br.com.hospitaldocoracaoal.hsup

class Fabricante {

    String nome
    Boolean ativo

    static constraints = {
        nome nullable: false, blank: false
        ativo nullable: false, blank: false
    }
}