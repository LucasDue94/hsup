package br.com.hospitaldocoracaoal.hsup

class Setor {

    String nome
    Boolean necessitaAutorizacao
    Usuario gestor

    static constraints = {
        nome nullable: false, blank: false
        necessitaAutorizacao nullable: false
        gestor nullable: true
    }
}
