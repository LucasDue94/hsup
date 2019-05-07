package br.com.hospitaldocoracaoal.hsup.integracao

class Produto implements Serializable {
    String id
    String descricao
    Float estoque

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
