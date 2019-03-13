package br.com.hospitaldocoracaoal.hsup

class ParametroSistema {

    String id
    String valor

    static constraints = {
        valor nullable: true, blank: false
    }

    static mapping = {
        id generator: 'assigned'
    }
}
