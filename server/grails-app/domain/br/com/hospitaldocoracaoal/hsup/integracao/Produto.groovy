package br.com.hospitaldocoracaoal.hsup.integracao

class Produto {
    String id
    String setor
    String descricao
    String quantidade

    static mapping = {
        id generator: 'assigned'
        version false
    }


}
