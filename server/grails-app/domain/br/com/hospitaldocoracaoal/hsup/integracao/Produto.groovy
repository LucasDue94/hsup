package br.com.hospitaldocoracaoal.hsup.integracao

class Produto implements Serializable {
    String id
    String descricao
    Number estoque

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
