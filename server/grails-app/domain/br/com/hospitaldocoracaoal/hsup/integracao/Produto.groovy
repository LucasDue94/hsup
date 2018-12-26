package br.com.hospitaldocoracaoal.hsup.integracao

class Produto {
    String id
    String setor
    String descricao
    String estoque
    String bloqueado

    static mapping = {
        id generator: 'assigned'
        version false
    }


}
