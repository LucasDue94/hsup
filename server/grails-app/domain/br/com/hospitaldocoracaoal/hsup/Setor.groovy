package br.com.hospitaldocoracaoal.hsup

class Setor {

    String nome
    Boolean necessitaAutorizacao

    static constraints = {
        nome nullable: false, blank: false
        necessitaAutorizacao nullable: false, blank: false
    }
}
