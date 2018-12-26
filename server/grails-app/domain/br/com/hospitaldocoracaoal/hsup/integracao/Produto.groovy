package br.com.hospitaldocoracaoal.hsup.integracao

class Produto {
    String id
    String setor
    String descricao
    String estoque

    static mapping = {
        id generator: 'assigned'
        version false
    }


}
